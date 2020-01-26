

$(function () {


  function prepareData(json) {


    var datachart1 = [];
    json.chart1.forEach(item => {
      let list=item.val.map(x=>x.val)
      list.unshift(item.key);
      datachart1.push(list);
    });
    
    var datachart2 = [];
    json.chart2.forEach(item => {
      let list=item.val.map(x=>x.val)
      list.unshift(item.key);
      datachart2.push(list);
    })


    return {datachart1,datachart2};
  }
  $.getJSON('/analyze_study_and_travel_time', function (externaldata) {
    let {datachart1,datachart2}=prepareData(externaldata);
    var chart1 = c3.generate({
      bindto: ".container.main-content.chart1 > div",
      data: {
        columns: datachart1,
        type: 'bar'
      },
      bar: {
        width: {
          ratio: 0.5 // this makes bar width 50% of length between ticks
        }
        // or
        //width: 100 // this makes bar width 100px
      },
      axis: {
        x: {
          label: 'Study time',
          tick: {
            fit: false
          }
        },
        y: {
          label: 'Mean of grade'
        }
      }
    });
    var chart2 = c3.generate({
      bindto: ".container.main-content.chart2 > div",
      data: {
        columns: datachart2,
        type: 'bar'
      },
      bar: {
        width: {
          ratio: 0.5 // this makes bar width 50% of length between ticks
        }
        // or
        //width: 100 // this makes bar width 100px
      },
      axis: {
        x: {
          label: 'Travel time',
          tick: {
            fit: false
          }
        },
        y: {
          label: 'Mean of grade'
        }
      }
    });
  });
});
