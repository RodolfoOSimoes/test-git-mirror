import { Injectable } from '@nestjs/common';
import { SendMailProducerService } from 'src/jobs/producers/sendMail-producer-service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Excel = require('exceljs');

@Injectable()
export class ExcelService {
  constructor(private sendMailProducer: SendMailProducerService) {}

  async generateRescueAnalytics(users: any, email, name) {
    const buffer = await this.excel(users);
    this.sendMailProducer.sendReportEmail(buffer, email, name);
  }

  async excel(users) {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('users');

    worksheet.columns = [
      { header: 'Nome', key: 'name' },
      { header: 'Email', key: 'email' },
      { header: 'Total', key: 'total' },
    ];

    const data = users.map((user) => {
      return {
        name: user.name,
        email: user.email,
        total: user.total_streams,
      };
    });

    data.forEach((e) => {
      worksheet.addRow(e);
    });
    return await workbook.xlsx.writeBuffer();
  }
}
