import { Pie } from 'react-chartjs-2';
import css from './statistics.module.scss';
import { useCallback } from 'react';
import countryData from '../../data/countries.json';
import { registerables } from 'chart.js';
import { Chart } from 'chart.js';
import { useUserStore } from '../../context/usersContext';

const colors = {
  Israel: 'rgba(1, 54, 177, 0.7)',
  China: 'rgba(231, 27, 37, 0.5)',
  Ukraine: 'rgba(247, 206, 0, 0.8)',
  Canada: 'rgba(231, 27, 37, 0.5)',
  Brazil: 'rgba(0, 156, 55, 0.8)',
  Morocco: 'rgba(231, 27, 37, 0.5)',
  France: 'rgba(40, 80, 177, 0.7)',
  Japan: 'rgba(255, 255, 255, 0.8)',
};

const images = Object.entries(countryData).map(([k, v]) => {
  const image = new Image(24, 24);
  image.src = v.flag;
  image.accessKey = k;

  return image;
});

export default function StatisticsPage() {
  const { usersData } = useUserStore();

  if (registerables) {
    Chart.register(...registerables);
  }

  const calcNumberOfUsersPerCountry = useCallback(() => {
    const countriesCount: { [key: string]: { value: number; color: string } } = {};

    for (const { country } of usersData) {
      if (!country) continue;
      if (!(country in countriesCount))
        Object.assign(countriesCount, {
          [country]: { value: 1, color: colors[country] },
        });
      else countriesCount[country].value += 1;
    }

    return countriesCount;
  }, [usersData]);

  return (
    <div className={css.pageRoot}>
      <div className={css['countries-data']}>
        {Object.entries(calcNumberOfUsersPerCountry()).map(([country, { value }]) => (
          <div className={css['country-container']} key={country}>
            <img src={countryData[country].flag} className={css['flag-container']}></img>
            <span className={css['country-name-container']}>{country}:</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
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

                const countriesKeys = Object.keys(calcNumberOfUsersPerCountry());

                if (countriesKeys.length === 0) {
                  // ctx.restore();
                  // return;
                }

                for (let i = 0; i < data.length; i++) {
                  const v: any = data[i];

                  const vAngle = v / 2 + data.slice(0, i).reduce((a: any, b) => a + b, 0);
                  const angle = (360 / vTotal) * vAngle - 90;
                  const radians = angle * (Math.PI / 180);
                  const r = yCenter;
                  const x = xCenter + (Math.cos(radians) * r) / 2;
                  const y = yCenter + (Math.sin(radians) * r) / 2;
                  ctx.translate(x, y);
                  const image = images.find((img) => img.accessKey === countriesKeys[i]);

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
            labels: Object.keys(calcNumberOfUsersPerCountry()),
            datasets: [
              {
                data: Object.values(calcNumberOfUsersPerCountry()).map((v) => v.value),
                parsing: {
                  xAxisKey: 'key',
                  yAxisKey: 'value',
                },
                backgroundColor: Object.values(calcNumberOfUsersPerCountry()).map(
                  (v) => v.color
                ),
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
