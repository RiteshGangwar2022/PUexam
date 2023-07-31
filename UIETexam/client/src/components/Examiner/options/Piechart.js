import React from 'react';
import { PieChart, Pie, Cell, Label } from 'recharts';

const Piechart = (props) => {
  // Destructure the data prop from props
  const { data } = props;

  return (
    <div>
      <PieChart width={145} height={145}>
        <Pie
          data={data}
          dataKey="students"
          outerRadius={73}
          innerRadius={34}
          fill="#8884d8"
          label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
            const RADIAN = Math.PI / 180;
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text
                x={x}
                y={y}
                fontSize="14px"
                fontWeight="bold"
                fill="#fff"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {`${(percent * 100).toFixed(2)}%`}
              </text>
            );
          }}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default Piechart;
