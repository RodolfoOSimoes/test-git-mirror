import { Statement } from 'src/entities/statement.entity';
import { Withdrawal } from 'src/entities/withdrawals.entity';

const generateBalance = (
  statements: Statement[],
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

  return amount - withdrawal;
};

export { generateBalance };
