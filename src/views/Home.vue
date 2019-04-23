<template>
  <div class="home">
    <div id="c1"></div>
    <div id="c2"></div>
    <div id="c3"></div>

    <div id="c4"></div>
    <div id="c5"></div>
    <div id="c51"></div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {},
  mounted() {
    const Shape = this.G2.Shape;
    Shape.registerShape("interval", "triangle", {
      getPoints(cfg) {
        const x = cfg.x;
        const y = cfg.y;
        const y0 = cfg.y0;
        const width = cfg.size;
        return [
          { x: x - width / 2, y: y0 },
          { x: x, y: y },
          { x: x + width / 2, y: y0 }
        ];
      },
      draw(cfg, group) {
        // 自定义最终绘制
        const points = this.parsePoints(cfg.points); // 将0-1空间的坐标转换为画布坐标
        const polygon = group.addShape("polygon", {
          attrs: {
            points: [
              [points[0].x, points[0].y],
              [points[1].x, points[1].y],
              [points[2].x, points[2].y]
            ],
            fill: cfg.color
          }
        });
        return polygon; // !必须返回 shape
      }
    });

    const data = [
      { genre: "Sports", sold: 275 },
      { genre: "Strategy", sold: 115 },
      { genre: "Action", sold: 120 },
      { genre: "Shooter", sold: 350 },
      { genre: "Other", sold: 150 }
    ]; // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
    // Step 1: 创建 Chart 对象
    const chart = new this.G2.Chart({
      container: "c1", // 指定图表容器 ID     //也可以为html元素
      width: 600, // 指定图表宽度
      height: 300, // 指定图表高度,
      renderer: "svg"
    });
    // Step 2: 载入数据源
    chart.source(data);
    // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
    chart
      .interval()
      .position("genre*sold")
      .color("genre")
      .shape("triangle");
    // Step 4: 渲染图表
    chart.render();
    // chart.changeData([
    //   { genre: "ddd", sold: 275 },
    //   { genre: "xxx", sold: 115 }
    // ]);
    // chart.forceFit();
    // chart.animate(false);

    const data2 = [
      { value: 10, time: "2015-03-01T16:00:00.000Z" },
      { value: 15, time: "2015-03-01T16:10:00.000Z" },
      { value: 26, time: "2015-03-01T16:20:00.000Z" },
      { value: 9, time: "2015-03-01T16:30:00.000Z" },
      { value: 12, time: "2015-03-01T16:40:00.000Z" },
      { value: 23, time: "2015-03-01T16:50:00.000Z" },
      { value: 18, time: "2015-03-01T17:00:00.000Z" },
      { value: 21, time: "2015-03-01T17:10:00.000Z" },
      { value: 22, time: "2015-03-01T17:20:00.000Z" }
    ];
    const chart2 = new this.G2.Chart({
      container: "c2",
      // forceFit: true,
      width: 600,
      height: 400
    });
    chart2.source(data2, {
      time: {
        type: "time",
        nice: false,
        mask: "HH:mm"
      },
      value: {
        formatter: val => {
          return val + " k";
        }
      }
    });
    chart2.axis("value", {
      label: {
        formatter: function(value) {
          return value + " D";
        }
      }
    });
    chart2
      .point()
      .position("time*value")
      .color("value", value => {
        if (value < 15) {
          return "red";
        }
        return "green";
      })
      .opacity(0.5)
      .size("value", [3, 10])
      .shape("value", value => {
        if (value < 20) {
          return "circle";
        }
        return "square";
      });

    chart2.render();
    const data3 = [{ x: 1, y: "aa" }, { x: 3, y: "bb" }, { x: 4, y: "cc" }];
    const chart3 = new this.G2.Chart({
      container: "c3",
      width: 600,
      height: 400
    });
    chart3.source(data3);
    chart3.coord("theta");
    chart3
      .intervalStack()
      .position("x")
      .color("y")
      .label("x", {
        formatter: function(val, item) {
          return item.point.y + ": " + val;
        }
      });
    chart3.axis(false);
    chart3.render();

    //c4
    const data4 = [
      { x: 95, y: 95, z: 13.8, name: "BE", country: "Belgium" },
      { x: 86.5, y: 102.9, z: 14.7, name: "DE", country: "Germany" },
      { x: 80.8, y: 91.5, z: 15.8, name: "FI", country: "Finland" },
      { x: 80.4, y: 102.5, z: 12, name: "NL", country: "Netherlands" },
      { x: 80.3, y: 86.1, z: 11.8, name: "SE", country: "Sweden" },
      { x: 78.4, y: 70.1, z: 16.6, name: "ES", country: "Spain" },
      { x: 74.2, y: 68.5, z: 14.5, name: "FR", country: "France" },
      { x: 73.5, y: 83.1, z: 10, name: "NO", country: "Norway" },
      { x: 71, y: 93.2, z: 24.7, name: "UK", country: "United Kingdom" },
      { x: 69.2, y: 57.6, z: 10.4, name: "IT", country: "Italy" },
      { x: 68.6, y: 20, z: 16, name: "RU", country: "Russia" },
      { x: 65.5, y: 126.4, z: 35.3, name: "US", country: "United States" },
      { x: 65.4, y: 50.8, z: 28.5, name: "HU", country: "Hungary" },
      { x: 63.4, y: 51.8, z: 15.4, name: "PT", country: "Portugal" },
      { x: 64, y: 82.9, z: 31.3, name: "NZ", country: "New Zealand" }
    ];
    const chart4 = new this.G2.Chart({
      container: "c1",
      forceFit: true,
      height: 350,
      padding: [20, 0, 80, 80],
      plotBackground: {
        stroke: "#ccc", // 边颜色
        lineWidth: 1 // 边框粗细
      } // 绘图区域背景设置
    });
    chart4.source(data4, {
      x: {
        alias: "Daily fat intake", // 定义别名
        tickInterval: 5, // 自定义刻度间距
        nice: true, // 不对最大最小值优化
        max: 96, // 自定义最大值
        min: 62 // 自定义最小是
      },
      y: {
        alias: "Daily sugar intake",
        tickInterval: 50,
        nice: true,
        max: 165,
        min: 0
      },
      z: {
        alias: "Obesity(adults) %"
      }
    });
    // 开始配置坐标轴
    chart4.axis("x", {
      label: {
        formatter: val => {
          return val + " gr"; // 格式化坐标轴显示文本
        }
      },
      grid: {
        lineStyle: {
          stroke: "#aaa",
          lineWidth: 1,
          lineDash: [2, 2] //虚线[线长，间隙长度]
        }
      }
    });
    chart4.axis("y", {
      title: {
        offset: 60
      },
      label: {
        formatter: val => {
          if (val > 0) {
            return val + " gr";
          }
        }
      }
    });
    // chart4.legend(false);
    // chart4.tooltip({
    //   title: "country"
    // });

    chart4
      .point()
      .position("x*y")
      .size("z", [10, 40])
      .label("name*country", {
        offset: 0, // 文本距离图形的距离
        textStyle: {
          fill: "#000",
          fontWeight: "bold", // 文本粗细
          shadowBlur: 5, // 文本阴影模糊
          shadowColor: "#fff" // 阴影颜色
        }
      })
      .color("#3182bd")
      .opacity(0.5)
      .shape("circle")
      .tooltip("x*y*z");
    chart4.tooltip("x*y");
    chart4.guide().line({
      start: [65, "min"],
      end: [65, "max"],
      text: {
        content: "Safe fat intake 65g/day",
        position: "end",
        autoRotate: false,
        style: {
          textAlign: "start"
        }
      }
    });
    chart4.guide().line({
      start: ["min", 50],
      end: ["max", 50],
      text: {
        content: "Safe sugar intake 50g/day",
        position: "end",
        style: {
          textAlign: "end"
        }
      }
    });

    chart4.render();

    var data5 = [
      { date: "Jan 1 2000", price: 1394.46 },
      { date: "Feb 1 2000", price: 1366.42 },
      { date: "Mar 1 2000", price: 1498.58 },
      { date: "Apr 1 2000", price: 1452.43 },
      { date: "May 1 2000", price: 1420.6 },
      { date: "Jun 1 2000", price: 1454.6 },
      { date: "Jul 1 2000", price: 1430.83 },
      { date: "Aug 1 2000", price: 1517.68 },
      { date: "Sep 1 2000", price: 1436.51 },
      { date: "Oct 1 2000", price: 1429.4 },
      { date: "Nov 1 2000", price: 1314.95 },
      { date: "Dec 1 2000", price: 1320.28 },
      { date: "Jan 1 2001", price: 1366.01 },
      { date: "Feb 1 2001", price: 1239.94 },
      { date: "Mar 1 2001", price: 1160.33 },
      { date: "Apr 1 2001", price: 1249.46 },
      { date: "May 1 2001", price: 1255.82 },
      { date: "Jun 1 2001", price: 1224.38 },
      { date: "Jul 1 2001", price: 1211.23 },
      { date: "Aug 1 2001", price: 1133.58 },
      { date: "Sep 1 2001", price: 1040.94 },
      { date: "Oct 1 2001", price: 1059.78 },
      { date: "Nov 1 2001", price: 1139.45 },
      { date: "Dec 1 2001", price: 1148.08 },
      { date: "Jan 1 2002", price: 1130.2 },
      { date: "Feb 1 2002", price: 1106.73 },
      { date: "Mar 1 2002", price: 1147.39 },
      { date: "Apr 1 2002", price: 1076.92 },
      { date: "May 1 2002", price: 1067.14 },
      { date: "Jun 1 2002", price: 989.82 },
      { date: "Jul 1 2002", price: 911.62 },
      { date: "Aug 1 2002", price: 916.07 },
      { date: "Sep 1 2002", price: 815.28 },
      { date: "Oct 1 2002", price: 885.76 },
      { date: "Nov 1 2002", price: 936.31 },
      { date: "Dec 1 2002", price: 879.82 },
      { date: "Jan 1 2003", price: 855.7 },
      { date: "Feb 1 2003", price: 841.15 },
      { date: "Mar 1 2003", price: 848.18 },
      { date: "Apr 1 2003", price: 916.92 },
      { date: "May 1 2003", price: 963.59 },
      { date: "Jun 1 2003", price: 974.5 },
      { date: "Jul 1 2003", price: 990.31 },
      { date: "Aug 1 2003", price: 1008.01 },
      { date: "Sep 1 2003", price: 995.97 },
      { date: "Oct 1 2003", price: 1050.71 },
      { date: "Nov 1 2003", price: 1058.2 },
      { date: "Dec 1 2003", price: 1111.92 },
      { date: "Jan 1 2004", price: 1131.13 },
      { date: "Feb 1 2004", price: 1144.94 },
      { date: "Mar 1 2004", price: 1126.21 },
      { date: "Apr 1 2004", price: 1107.3 },
      { date: "May 1 2004", price: 1120.68 },
      { date: "Jun 1 2004", price: 1140.84 },
      { date: "Jul 1 2004", price: 1101.72 },
      { date: "Aug 1 2004", price: 1104.24 },
      { date: "Sep 1 2004", price: 1114.58 },
      { date: "Oct 1 2004", price: 1130.2 },
      { date: "Nov 1 2004", price: 1173.82 },
      { date: "Dec 1 2004", price: 1211.92 },
      { date: "Jan 1 2005", price: 1181.27 },
      { date: "Feb 1 2005", price: 1203.6 },
      { date: "Mar 1 2005", price: 1180.59 },
      { date: "Apr 1 2005", price: 1156.85 },
      { date: "May 1 2005", price: 1191.5 },
      { date: "Jun 1 2005", price: 1191.33 },
      { date: "Jul 1 2005", price: 1234.18 },
      { date: "Aug 1 2005", price: 1220.33 },
      { date: "Sep 1 2005", price: 1228.81 },
      { date: "Oct 1 2005", price: 1207.01 },
      { date: "Nov 1 2005", price: 1249.48 },
      { date: "Dec 1 2005", price: 1248.29 },
      { date: "Jan 1 2006", price: 1280.08 },
      { date: "Feb 1 2006", price: 1280.66 },
      { date: "Mar 1 2006", price: 1294.87 },
      { date: "Apr 1 2006", price: 1310.61 },
      { date: "May 1 2006", price: 1270.09 },
      { date: "Jun 1 2006", price: 1270.2 },
      { date: "Jul 1 2006", price: 1276.66 },
      { date: "Aug 1 2006", price: 1303.82 },
      { date: "Sep 1 2006", price: 1335.85 },
      { date: "Oct 1 2006", price: 1377.94 },
      { date: "Nov 1 2006", price: 1400.63 },
      { date: "Dec 1 2006", price: 1418.3 },
      { date: "Jan 1 2007", price: 1438.24 },
      { date: "Feb 1 2007", price: 1406.82 },
      { date: "Mar 1 2007", price: 1420.86 },
      { date: "Apr 1 2007", price: 1482.37 },
      { date: "May 1 2007", price: 1530.62 },
      { date: "Jun 1 2007", price: 1503.35 },
      { date: "Jul 1 2007", price: 1455.27 },
      { date: "Aug 1 2007", price: 1473.99 },
      { date: "Sep 1 2007", price: 1526.75 },
      { date: "Oct 1 2007", price: 1549.38 },
      { date: "Nov 1 2007", price: 1481.14 },
      { date: "Dec 1 2007", price: 1468.36 },
      { date: "Jan 1 2008", price: 1378.55 },
      { date: "Feb 1 2008", price: 1330.63 },
      { date: "Mar 1 2008", price: 1322.7 },
      { date: "Apr 1 2008", price: 1385.59 },
      { date: "May 1 2008", price: 1400.38 },
      { date: "Jun 1 2008", price: 1280 },
      { date: "Jul 1 2008", price: 1267.38 },
      { date: "Aug 1 2008", price: 1282.83 },
      { date: "Sep 1 2008", price: 1166.36 },
      { date: "Oct 1 2008", price: 968.75 },
      { date: "Nov 1 2008", price: 896.24 },
      { date: "Dec 1 2008", price: 903.25 },
      { date: "Jan 1 2009", price: 825.88 },
      { date: "Feb 1 2009", price: 735.09 },
      { date: "Mar 1 2009", price: 797.87 },
      { date: "Apr 1 2009", price: 872.81 },
      { date: "May 1 2009", price: 919.14 },
      { date: "Jun 1 2009", price: 919.32 },
      { date: "Jul 1 2009", price: 987.48 },
      { date: "Aug 1 2009", price: 1020.62 },
      { date: "Sep 1 2009", price: 1057.08 },
      { date: "Oct 1 2009", price: 1036.19 },
      { date: "Nov 1 2009", price: 1095.63 },
      { date: "Dec 1 2009", price: 1115.1 },
      { date: "Jan 1 2010", price: 1073.87 },
      { date: "Feb 1 2010", price: 1104.49 },
      { date: "Mar 1 2010", price: 1140.45 }
    ];
    var ds = new this.Dataset({
      state: {
        dates: null
      }
    });
    var totalDv = ds.createView().source(data5);
    var dv = ds.createView();
    dv.source(data5).transform({
      type: "filter",
      callback: function(obj) {
        if (ds.state.dates) {
          return ds.state.dates.indexOf(obj.date) > -1;
        }
        return obj;
      }
    });
    var chart5 = new this.G2.Chart({
      width: 600,
      height: 400,
      container: "c5"
    });
    chart5.source(dv, {
      date: {
        type: "time",
        tickCount: 10,
        mask: "MMM D YYYY"
      },
      price: {
        min: totalDv.min("price"),
        max: totalDv.max("price")
      }
    });
    chart5
      .area()
      .position("date*price")
      .shape("smooth")
      .opacity(0.8);
    chart5.render();
    // second chart
    var chart51 = new this.G2.Chart({
      container: "c51",
      forceFit: true,
      height: 200,
      padding: [5, 40, 60, 80]
    });
    chart51.source(data5, {
      date: {
        tickCount: 10,
        type: "time",
        mask: "YYYY"
      }
    });
    chart51.tooltip(false);
    chart51.axis("price", false);
    chart51
      .area()
      .position("date*price")
      .active(false)
      .shape("smooth")
      .opacity(0.85);
    chart51.render();

    chart51.interact("brush", {
      type: "X",
      draggable: true,
      inPlot: false,
      onBrushmove: function onBrushmove(ev) {
        var date = ev.date;

        ds.setState("dates", date);
      },
      onDragmove: function onDragmove(ev) {
        var date = ev.date;

        ds.setState("dates", date);
      }
    });
  }
};
</script>
<style scoped>
.home {
  width: 100%;
  height: 100%;
}
div {
  width: 600px;
  height: 400px;
  float: left;
}
#c5 {
  height: 600px;
}
</style>

