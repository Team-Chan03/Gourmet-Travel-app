import React, { useEffect, memo } from 'react';
import * as d3 from 'd3';
import geoJson from './../../../utils/japan.json';
import { Box, Card, Typography } from '@mui/material';
import './JapanMap.css';

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

    const defs = svg.append('defs');

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
        if (t < 5 && t > 0) {
          color = '#2566CC';
        } else if (t === 0) {
          color = '#ffffff';
        }
        return color;
      })
      .each(function (item) {
        // 各path要素に対して処理
        const prefName = item.properties.name_ja;
        const t = getTarget({ list, prefName: prefName });

        // グラデーションのIDを都道府県名に基づいて生成
        const gradientId = `gradient-${prefName.replace(/\s/g, '')}`; // スペースは削除

        // グラデーションの色をデータに基づいて決定
        let stopColor1, stopColor2;
        if (t >= 20) {
          stopColor1 = '#d0a900'; // 濃い色
          stopColor2 = '#fff9e6'; // 薄い色
        } else if (t >= 10) {
          stopColor1 = '#757575';
          stopColor2 = '#E8E8E8';
        } else if (t >= 5) {
          stopColor1 = '#a57e65';
          stopColor2 = '#f3cfb8';
        }

        if (t >= 5) {
          // linearGradientをdefsに追加
          defs
            .append('linearGradient')
            .attr('id', gradientId)
            .attr('gradientUnits', 'objectBoundingBox') // objectBoundingBox を使用
            .attr('x1', '0%') // グラデーションの開始点（左）
            .attr('y1', '0%')
            .attr('x2', '100%') // グラデーションの終了点（右）
            .attr('y2', '100%') // 上から下へのグラデーションにする場合、y2を100%に
            .append('stop')
            .attr('offset', '0%')
            .attr('stop-color', stopColor1);

          defs
            .select(`#${gradientId}`) // 既存のグラデーションを選択
            .append('stop')
            .attr('offset', '50%')
            .attr('stop-color', stopColor2);

          defs
            .select(`#${gradientId}`)
            .append('stop')
            .attr('offset', '100%') // 終了の色 (stopColor2)
            .attr('stop-color', stopColor1);

          // 各path要素のfill属性にグラデーションのURLを設定
          d3.select(this).attr('fill', `url('#${gradientId}')`);
        }
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

    /**
     * 都道府県領域の MouseOver イベントハンドラ
     */
    // .on(`mouseover`, async function (item, target) {
    //   // ラベル用のグループ
    //   const group = svg.append(`g`).attr(`id`, `label-group`);
    //   const t = getTarget({ list, prefName: item.crs.properties.name });
    //   const count = t ? t.count : 0;
    //   // ラベルに表示する文字
    //   const label = `${target.properties.name_ja}(${count}人)`;
    //   // 矩形を追加: テキストの枠
    //   const rectElement = group
    //     .append(`rect`)
    //     .attr(`id`, `label-rect`)
    //     .attr(`stroke`, `#666`)
    //     .attr(`stroke-width`, 0.5)
    //     .attr(`fill`, `#fff`);

    //   // テキストを追加
    //   const textElement = group
    //     .append(`text`)
    //     .attr(`id`, `label-text`)
    //     .text(label);

    //   // テキストのサイズから矩形のサイズを調整
    //   const padding = {
    //     x: 5,
    //     y: 0,
    //   };
    //   const textSize = textElement.node().getBBox();
    //   // const textSize = textElement.node();

    //   rectElement
    //     .attr(`x`, textSize.x - padding.x)
    //     .attr(`y`, textSize.y - padding.y)
    //     .attr(`width`, textSize.width + padding.x * 2)
    //     .attr(`height`, textSize.height + padding.y * 2);

    //   // @ts-ignore
    //   d3.select(this).attr(`fill`, colorActive);
    //   // @ts-ignore
    //   d3.select(this).attr(`stroke-width`, `1`);
    // })

    /**
     * 都道府県領域の MouseMove イベントハンドラ
     */
    // .on('mousemove', function (item) {
    //   // テキストのサイズ情報を取得
    //   const textSize = svg.select('#label-text').node().getBBox();
    //   // const textSize = svg.select('#label-text').node();

    //   // マウス位置からラベルの位置を指定
    //   const labelPos = {
    //     x: item.offsetX - textSize.width,
    //     y: item.offsetY - textSize.height,
    //   };

    //   // ラベルの位置を移動
    //   svg
    //     .select('#label-group')
    //     .attr(`transform`, `translate(${labelPos.x}, ${labelPos.y})`);
    // })

    /**
     * 都道府県領域の MouseOut イベントハンドラ
     */
    // .on(`mouseout`, function (item) {
    //   // ラベルグループを削除
    //   svg.select('#label-group').remove();
    //   // @ts-ignore
    //   d3.select(this).attr(`fill`, color);
    //   // @ts-ignore
    //   d3.select(this).attr(`stroke-width`, `0.25`);
    // });
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
        <Card
          sx={{
            position: 'absolute',
            top: '20%',
            left: 50,
            backgroundColor: '#fffaf0',
            boxShadow: 1,
            borderRadius: 2,
            p: 3,
            pl: 5,
            width: 140,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div className='gold'></div>
            <Typography sx={{ m: 1, fontWeight: 'bold' }}>
              : 20回~
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div className='silver'></div>

            <Typography sx={{ m: 1, fontWeight: 'bold' }}>: 10~19回</Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div className='bronz'></div>

            <Typography sx={{ m: 1, fontWeight: 'bold' }}>: 5~9回</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div className='blue'></div>
            <Typography sx={{ m: 1, fontWeight: 'bold' }}>: 1~4回</Typography>
          </Box>
        </Card>
        <div id='map-container' className='w-[500px] h-[500px]' />
      </Box>
    </>
  );
};

export default memo(JapanMap);
