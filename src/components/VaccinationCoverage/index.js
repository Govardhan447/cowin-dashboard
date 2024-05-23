import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {vaccinationCoverageDetails} = props
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <ResponsiveContainer width="80%" height={500}>
      <BarChart
        width={1000}
        height={300}
        data={vaccinationCoverageDetails}
        margin={{top: 5}}
      >
        <XAxis dataKey="vaccine_date" tick={{stroke: 'gray', strokeWidth: 1}} />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{storke: 'gray', strokeWidth: 0}}
        />
        <Legend wrapperStyle={{padding: 20}} />
        <Bar
          dataKey="dose_1"
          name="Dose1"
          fill="#5a8dee"
          barSize="20%"
          className="bar"
        />
        <Bar
          dataKey="dose_2"
          name="Dose2"
          fill="#f54394"
          barSize="20%"
          className="bar"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
export default VaccinationCoverage
