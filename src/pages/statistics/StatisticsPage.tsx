import { Line, Pie } from 'react-chartjs-2';
import css from './statistics.module.scss';
import { useCallback, useMemo } from 'react';
import countryData from '../../data/countries.json';
import { BubbleDataPoint, ChartData, Point, plugins, registerables } from 'chart.js';
import { CategoryScale, Chart } from 'chart.js';
import { useUserStore } from '../../context/usersContext';

const imageURLs = [
  '/static/flags/Flag_of_Israel.svg.webp',
  '/static/flags/Flag-China.webp',
  '/static/flags/Flag-Ukraine.webp',
  '/static/flags/Flag-Canada.webp',
  '/static/flags/640px-Flag_of_Brazil.svg.png',
  '/static/flags/Flag-Morocco.webp',
  '/static/flags/Flag_of_France.png',
  '/static/flags/Japan_flag.png',
];

const images = imageURLs.map((v) => {
  const image = new Image(24, 24);
  image.src = v;

  return image;
});

export default function StatisticsPage() {
  const { usersData } = useUserStore();

  const countriesList = useMemo(() => Object.keys(countryData), [countryData]);

  if (registerables) {
    Chart.register(...registerables);
  }

  const calcNumberOfUsersPerCountry = useCallback(() => {
    const countriesCount = {};

    for (const { country } of usersData) {
      if (!country) continue;
      if (!(country in countriesCount)) countriesCount[country] = 1;
      else countriesCount[country] += 1;
    }

    return countriesCount;
  }, [usersData]);

  return (
    <div className={css.pageRoot}>
      <div className={css['chart-container']}>
        <Pie
          options={{ plugins: { legend: { display: false } } }}
          plugins={[
            {
              id: '',
              afterDatasetsDraw: (chart) => {
                const ctx = chart.ctx;
                ctx.save();

                const xCenter = chart.canvas.parentElement.clientWidth / 2;
                const yCenter = chart.canvas.parentElement.clientHeight / 2;
                const data = chart.config.data.datasets[0].data;
                const vTotal = data.reduce((a: any, b) => a + b, 0);

                for (let i = 0; i < data.length; i++) {
                  const v: any = data[i];

                  const vAngle = v / 2 + data.slice(0, i).reduce((a: any, b) => a + b, 0);
                  const angle = (360 / vTotal) * vAngle - 90;
                  const radians = angle * (Math.PI / 180);
                  const r = yCenter;
                  const x = xCenter + (Math.cos(radians) * r) / 2;
                  const y = yCenter + (Math.sin(radians) * r) / 2;
                  ctx.translate(x, y);
                  const image = images[i];
                  const imageWidth = 30;
                  ctx.drawImage(
                    image,
                    -(image?.width ?? 24) / 2,
                    -(image?.height ?? 24) / 2,
                    imageWidth,
                    (imageWidth / 8) * 5
                  );
                  ctx.translate(-x, -y);
                }

                ctx.restore();
              },
            },
          ]}
          data={{
            labels: countriesList,
            datasets: [
              {
                data: Object.values(calcNumberOfUsersPerCountry()),
                parsing: {
                  xAxisKey: 'key',
                  yAxisKey: 'value',
                },
                backgroundColor: [
                  'rgba(1, 54, 177, 0.7)',
                  'rgba(231, 27, 37, 0.5)',
                  'rgba(247, 206, 0, 0.8)',
                  'rgba(231, 27, 37, 0.5)',
                  'rgba(0, 156, 55, 0.8)',
                  'rgba(231, 27, 37, 0.5)',
                  'rgba(40, 80, 177, 0.7)',
                  'rgba(255, 255, 255, 0.8)',
                ],
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
