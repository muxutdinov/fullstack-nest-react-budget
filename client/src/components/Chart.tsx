import { FC } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#00C49F", "#FF8042"];

interface IChart {
  totalIncome: number;
  totalExpense: number;
}

interface IData {
  value: number;
  name: string;
}

const Chart: FC<IChart> = ({ totalExpense, totalIncome }) => {
    
  const data = new Array<IData>(
    {
      value: totalExpense,
      name: "Expense",
    },
    {
      value: totalIncome,
      name: "Income",
    }
  );
  
  return (
    // <ResponsiveContainer width="100%" height="100%">
      <PieChart width={240} height={240}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
        //   label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend/>
        <Tooltip/>
      </PieChart>
    // </ResponsiveContainer>
  );
};

export default Chart;
