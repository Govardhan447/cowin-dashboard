import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const VaccinationByAge = props => {
  const {vaccinationAgeDetails} = props

  return (
    <ResponsiveContainer
      className="piachart-container"
      width="80%"
      height={500}
    >
      <PieChart>
        <Pie
          cx="50%"
          cy="50%"
          data={vaccinationAgeDetails}
          startAngle={0}
          endAngle={360}
          innerRadius="0%"
          outerRadius="50%"
          dataKey="count"
        >
          <Cell name="18-44" fill="#2d87bb" />
          <Cell name="44-60" fill="#a3df9f" />
          <Cell name="Above 60" fill="#64c2a6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          harizatalAlign="bottom"
          align="center"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default VaccinationByAge
