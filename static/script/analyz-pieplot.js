
function prepareData(json) {



  //data = data.sort((a, b) => a.participate > b.participate ? 1 : (a.participate < b.participate ? -1 : 0))

  return json.chart.map(item=>[item.key, item.val]);
}
function showchart(chart,fieldName,state) {



  $.getJSON('/analyze_freq?fieldName='+fieldName, function (jsonData) {
    state.remove();
    var data = prepareData(jsonData);
    chart.load({
      columns: data
    });
    state.setData(data);
  });

}
$(function () {
    currentData=[
        ['1', 1],
        ['2', 2],
        ['3', 2],
        ['4', 2],
        ['15', 2],
        ['16', 2],
        ['17', 2],
        ['18', 2],
        ['19', 2],
        ['20', 2],
        ['21', 2],
        ['22', 2],
        ['yes', 2],
        ['no', 2],
        ['M', 2],
        ['F', 2],
      ];
  var chart = c3.generate({
    bindto: ".container.main-content > div",
    data: {
      // iris data from R
      columns: currentData,
      type: 'pie',

    }
  });
  function removeOldData()
  {
    currentData.forEach(item => {
      chart.unload({
        ids: item[0]
      });
    });
  }
  let state={setData:data=>{currentData=data;},remove:removeOldData}
  showchart(chart,"age",state);
  $("#fieldName").change((e) => {
    $('.container.main-content h2 span').html($("option:selected",'#fieldName').html())
    showchart(chart, $(e.target).val(),state);
    
  });

});
