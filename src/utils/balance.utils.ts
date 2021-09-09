import { Statement } from 'src/entities/statement.entity';
import { Withdrawal } from 'src/entities/withdrawals.entity';
import { Extract } from 'src/entities/extract.entity';

const generateBalance = (
  statements: Statement[],
  extracts: Extract[],
  withdrawals: Withdrawal[],
) => {
  const amount = statements.reduce(
    (current, total) => current + Number(total.amount),
    0,
  );

  const withdrawal = withdrawals.reduce(
    (current, total) => current + Number(total.spending),
    0,
  );

  const expired = extracts.reduce(
    (current, total) => current + Number(total.expired),
    0,
  );

  return amount - withdrawal - expired;
};

export { generateBalance };
