import Chart from 'react-apexcharts'
import { Paper, useMantineTheme } from '@mantine/core';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';


const AttendanceGraph = () => {

    const {colors, colorScheme} = useMantineTheme()

    const options: ApexOptions = {
        labels: ['Oct. 5, 2022', 'Oct. 12, 2022', 'Oct. 19, 2022', 'Oct. 26, 2022', 'Dec. 3, 2022', 'Dec. 10, 2022', 'Dec. 512, 2022', 'Dec. 24, 2022'],
        noData: {
            text: 'No data'
        },
        tooltip: {
            theme: colorScheme
        },

        markers: {
            size: 3,
            hover: {
                size: 9
            }
        },

        grid: {
            borderColor: colors.scheme[4]
        },
        chart: {
            foreColor: colors.scheme[2],
            toolbar: {show: false},
            type: 'area',
            zoom: {
                enabled: false
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },

        title: {
            text: 'Attendance',
            align: 'left'
        },
        subtitle: {
            text: '',
            align: 'left'
        },

        yaxis: {
            opposite: true,
            show: true
        },
        legend: {
            position: 'top',
            horizontalAlign: 'center'
        },
        responsive: [
            {
               breakpoint:undefined,
                options:{}
            }
        ]
    }
    return (
        <Paper p={10}>
            <Chart
                options={options}
                series={[{
                    name: 'Members',
                    data: [15, 20, 21, 16, 20, 12, 22, 35]
                }, {
                    name: 'Visitors',
                    data: [2, 8, 4, 3, 9, 6, 2, 5]
                }]}
                type="area"
                height={350}/>
        </Paper>
    );
}

export default AttendanceGraph;
