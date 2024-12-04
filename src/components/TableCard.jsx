import PropTypes from 'prop-types'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ProviderLogo } from '../components/ProviderLogo'

// import Chart from 'react-apexcharts';
import TrendingUp from '../icons/TrendingUp';
import TrendingDown from '../icons/TrendingDown';
import { explanations, getProviderTitleFromId } from '../constants'
import { fixedDecimals } from '../util/maths';

const colours = {
  udp: 'rgb(33,67,107)',
  tcp: 'rgb(97,156,220)',
  tls: 'rgb(14,30,47)',
};

export function TableCard({ title = '', description = '', field = '', columns = [], providerData = null, bestAndWorst = null }) {

  if (!title || !field || !providerData) {
    return <></>;
  }

  const generateColumns = (key, data, provider) => {
    let textColorClass = 'text-gray-800 dark:text-white';
    if (bestAndWorst && (key == 'avgApiResponseTime' ? bestAndWorst?.best?.name === provider : bestAndWorst[key]?.best?.name === provider)) {
      textColorClass = 'text-greenGood dark:text-greenGood-dark font-semibold';
    } else if (bestAndWorst && (key == 'avgApiResponseTime' ? bestAndWorst?.worst?.name === provider : bestAndWorst[key]?.worst?.name === provider)) {
      textColorClass = 'text-redBad dark:text-redBad-dark font-semibold';
    }

    return (
      <td key={key} className='size-px whitespace-nowrap px-6 py-3'>
        <span className={`text-sm ${textColorClass}`}>
          {data?.value ? `${fixedDecimals(data.value, 1)}` : 'N/A'}
        </span>
        {!!data?.offsetFromBestPercent && (
          <span className={`flex items-center gap-x-1 ${textColorClass}`}>
            {data.offsetFromBestPercent > 0 ? <TrendingUp /> : <TrendingDown />}
            <span className='inline-block text-xs'>
              {data.offsetFromBestPercent > 0 && '+'}
              {Math.ceil(data.offsetFromBestPercent)}%
            </span>
          </span>
        )}
      </td>
    )
  }

  const generateColumnHeaders = (i) => {
    return (
      <th key={i} scope='col' className='px-6 py-3 text-start whitespace-nowrap'>
        <span className='text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200'>
          {i} ({explanations[field].measure})
        </span>
      </th>
    )
  }

  const barChartData = Object.keys(providerData).map((providerName) => {
    if (providerName === 'google' && !['avgStunTimeToConnectedState', 'avgStunCandidate'].includes(field)) {
      return null
    }

    let d = {
      name: providerName,
    }

    if (providerData[providerName]?.udp) {
      Object.keys(providerData[providerName]).forEach((p) => {
        d[p] = providerData[providerName][p]?.value;
      })
    } else {
      d.apiResponseTime = providerData[providerName]?.value;
    }

    return d;
  })

  return (
    <div className='max-w-full py-10 lg:py-14 mx-auto'>
      {/* Card */}
      <div className='flex flex-col'>
        <div className='-m-1.5 overflow-x-auto'>
          <div className='p-1.5 min-w-full inline-block align-middle'>
            <div className='bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-900 dark:border-neutral-700'>
              {/* Header */}
              <div className='px-6 py-4 border-b border-gray-200 dark:border-neutral-700'>
                <h2 className='text-xl font-semibold text-gray-800 dark:text-neutral-200'>
                  {title}
                </h2>
                <p className='text-sm text-gray-600 dark:text-neutral-400'>
                  {description}
                </p>
              </div>
              {/* End Header */}

              {/* Table */}
              <table className='min-w-full divide-y divide-gray-200 dark:divide-neutral-700'>
                <thead className='bg-gray-50 dark:bg-neutral-800'>
                  <tr>
                    <th scope='col' className='px-6 py-3 text-start whitespace-nowrap max-w-30 hidden sm:table-cell'>
                      &nbsp;
                    </th>
                    <th scope='col' className='px-6 py-3 text-start whitespace-nowrap min-w-30'>
                      <span className='text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200'>
                        Provider
                      </span>
                    </th>

                    {columns.map((i) => {
                      return generateColumnHeaders(i)
                    })}

                    {/* <th scope='col' className='px-6 py-3 text-start whitespace-nowrap'>
                      <span className='text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200'>
                        Last 7 days
                      </span>
                    </th> */}
                  </tr>
                </thead>

                <tbody className='divide-y divide-gray-200 dark:divide-neutral-700'>
                  {Object.keys(providerData).map((provider) => {
                    const lcp = provider.toLowerCase();
                    const data = providerData[lcp];

                    if (!data) {
                      return null
                    }

                    if (lcp === 'google' && !['avgStunTimeToConnectedState', 'avgStunCandidate'].includes(field)) {
                      return null
                    }

                    return (
                      <tr key={provider} className='max-h-16'>
                        <td className='size-px whitespace-nowrap px-6 py-3 hidden sm:table-cell'>
                          <div className='flex items-center gap-x-3 max-h-14'>
                            <ProviderLogo provider={lcp} height="66px"/>
                          </div>
                        </td>
                        <td className='size-px whitespace-nowrap px-6 py-3'>
                          <div className='flex items-center gap-x-3'>
                            <span className='font-semibold text-sm text-gray-800 dark:text-white'>
                              {getProviderTitleFromId(provider) || provider}
                            </span>
                            {/* <span className='text-xs text-gray-500 dark:text-neutral-500'>ETH</span> */}
                          </div>
                        </td>
                        {field === 'avgApiResponseTime' ? (
                          generateColumns('avgApiResponseTime', data, provider)
                        ) : (
                          Object.keys(data).map((protocol) => {
                            return generateColumns(protocol, data[protocol], provider)
                          }))
                        }
                        {/* <td className='size-px whitespace-nowrap px-6 py-3'>
                          <Chart
                            style={{display: 'inline-block'}}
                            options={{
                              chart: {
                                sparkline: {
                                  enabled: true
                                }
                              },
                              stroke: {
                                curve: 'straight',
                                width: 2
                              },
                              xaxis: {
                                type: 'category',
                                categories: [
                                  '25 January 2023',
                                  '26 January 2023',
                                  '27 January 2023',
                                  '28 January 2023',
                                  '29 January 2023',
                                  '30 January 2023',
                                  '31 January 2023',
                                  '1 February 2023',
                                  '2 February 2023',
                                  '3 February 2023',
                                  '4 February 2023',
                                  '5 February 2023',
                                  '6 February 2023',
                                  '25 January 2023',
                                  '26 January 2023',
                                  '27 January 2023',
                                  '28 January 2023',
                                  '29 January 2023',
                                  '30 January 2023',
                                  '31 January 2023',
                                  '1 February 2023'
                                ],
                                crosshairs: {
                                  show: false
                                }
                              },
                              markers: {
                                hover: {
                                  size: 0
                                }
                              },
                            }}
                            series={[{name: 'Sales', data: [21, 20, 24, 20, 18, 17, 11, 17, 18, 30, 31, 30, 30, 35, 25, 35, 35, 40, 60, 90, 90]}]}
                            type='line'
                            width={100}
                            height={30}
                          />
                        </td> */}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              {/* End Table */}
            </div>
          </div>
        </div>
        <div className='mt-20 w-full h-96'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            data={barChartData.filter(i => i !== null)}
            overflow="visible"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={45} dx={15} dy={20}/>
            <YAxis tickFormatter={(i) => (`${i}${explanations[field].measure}`)}/>
            <Tooltip />
            <Legend verticalAlign="top"/>
            {columns.includes('udp') && columns.map((i, index) => (
              <Bar key={index} dataKey={i} fill={colours[i]} />
            ))}

            {!columns.includes('udp') && (
              <Bar dataKey="apiResponseTime" fill={colours.udp} />
            )}

          </BarChart>
        </ResponsiveContainer>
      </div>
      </div>
      {/* End Card */}
    </div>
  )
}

TableCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  field: PropTypes.string,
  columns: PropTypes.array,
  providerData: PropTypes.object,
  bestAndWorst: PropTypes.object,
};
