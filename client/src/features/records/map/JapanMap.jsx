import React, { useEffect, memo } from "react";
import * as d3 from "d3";
import geoJson from "./../../../utils/japan.json";

const getTarget = ({ list, prefName }) => {
  let pref = prefName;
  let count = 0;
  list.map((e) => {
    if (e.region === pref){
       count ++;
      }
  })
  if(count>0)console.log("count",pref, count);
  
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
    const width = 500; // 描画サイズ: 幅
    const height = 500; // 描画サイズ: 高さ
    const centerPos = [137.0, 38.2]; // 地図のセンター位置
    const scale = 1300; // 地図のスケール
    const color = "#2566CC"; // 地図の色
    const colorActive = "#ebfd2a"; // ホバーした時の色

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
      .attr(`height`, `100%`);

    // 都道府県の領域データをpathで描画
    svg
      .selectAll(`path`)
      .data(geoJson.features)
      .enter()
      .append(`path`)
      .attr(`d`, path)
      .attr(`stroke`, `#666`)
      .attr(`stroke-width`, 0.50)
      .attr(`fill`, (item) => {
        // 透明度の設定
        let color ;
        const t = getTarget({ list, prefName: item.properties.name_ja });
        if (t >= 5) {
          color = '#ff9f38'
        } else if(t >= 10){
          color = '#c0c0c0'
        }else if (t >= 20){
          color = '#e6b422'
        }else if (t < 5 && t > 0){
          color = '#2566CC'
        }
        else {
          color = '#ffffff'
        }
        ;
        return color;})
      .attr(`cursor`, (item) => {
        // カーソルの設定
        const t = getTarget({ list, prefName: item.properties.name_ja });
        if (!t || t.count === 0) return ;
        return "pointer";
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
      if (target) target.innerHTML = "";
    };
  }, [mounted]);

  return <div id="map-container" className="w-[500px] h-[500px]" />;
};

export default memo(JapanMap);
