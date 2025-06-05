import React, { useEffect, memo } from 'react';
import * as d3 from 'd3';
import geoJson from './../../../utils/japan.json';
import { Box } from '@mui/material';

const getTarget = ({ list, prefName }) => {
  let pref = prefName;
  let count = 0;
  list.map((e) => {
    if (e.region === pref) {
      count++;
    }
  });
  return count;
};

export function useMounted() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

const JapanMap = ({ list }) => {
  const mounted = useMounted();

  async function main() {
    const width = 1000; // 描画サイズ: 幅
    const height = 1000; // 描画サイズ: 高さ
    const centerPos = [137.0, 38.2]; // 地図のセンター位置
    const scale = 2500; // 地図のスケール
    // const color = "#2566CC"; // 地図の色
    // const colorActive = "#ebfd2a"; // ホバーした時の色

    // 地図設定
    const projection = d3
      .geoMercator()
      .center(centerPos)
      .translate([width / 2, height / 2])
      .scale(scale);

    // 地図をpathに投影(変換)
    const path = d3.geoPath().projection(projection);

    // SVG要素を追加
    const svg = d3
      .select(`#map-container`)
      .append(`svg`)
      .attr(`viewBox`, `0 0 ${width} ${height}`)
      .attr(`width`, `100%`)
      .attr(`height`, `100vh`);

    // 都道府県の領域データをpathで描画
    svg
      .selectAll(`path`)
      .data(geoJson.features)
      .enter()
      .append(`path`)
      .attr(`d`, path)
      .attr(`stroke`, `#666`)
      .attr(`stroke-width`, 1.5)
      .attr(`fill`, (item) => {
        // 透明度の設定
        let color;
        const t = getTarget({ list, prefName: item.properties.name_ja });
        if (t >= 20) {
          color = '#e6b422';
        } else if (t >= 10) {
          color = '#c0c0c0';
        } else if (t >= 5) {
          color = '#ff9f38';
        } else if (t < 5 && t > 0) {
          color = '#2566CC';
        } else {
          color = '#ffffff';
        }
        return color;
      })
      .attr(`cursor`, (item) => {
        // カーソルの設定
        const t = getTarget({ list, prefName: item.properties.name_ja });
        if (!t || t.count === 0) return;
        return 'pointer';
      })

      /**
       * 都道府県領域の click イベントハンドラ
       */
      .on(`click`, function (item, target) {
        // クリックイベントを追加したい場合はこちらに記述
        console.log({ item, target });
      });
  }

  useEffect(() => {
    (async () => {
      if (mounted) await main();
    })();
    return () => {
      const target = document.getElementById(`map-container`);
      if (target) target.innerHTML = '';
    };
  }, [mounted]);

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',

        }}
      >
        <div id='map-container' className='w-[500px] h-[500px]' />
      </Box>
    </>
  );
};

export default memo(JapanMap);
