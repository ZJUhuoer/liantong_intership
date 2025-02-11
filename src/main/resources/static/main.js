//-------------------------------------------------------选择市之后区县选项动态变化-------------------------------------------------------------------------

const provinceSelect = document.getElementById("province");
const citySelect = document.getElementById("city");
const countySelect = document.getElementById("county");
const indicatorSelect = document.getElementById("indicator");
  
const searchButton = document.getElementById("search-btn");
const tableBody = document.getElementById("data-table");

const cityCountyMap = {
  "杭州": ["全部", "余杭区AYH", "萧山区AXS", "西湖区AXH", "上城区ASD", "钱塘新区AXC", "临平区ALP", "临安市ALA", "拱墅区AGS", "富阳区AFY", "桐庐县ATL", "建德市AJD", "淳安县ACA", "滨江区ABJ", "杭州虚拟（集团）AJT", "杭州虚拟（公众）AHZ"],
  "宁波": ["全部", "镇海KZH", "鄞州KYX", "余姚KYY", "象山KXS", "宁海KNH", "江北KJB", "海曙KHS", "北仑KBL", "慈溪KCX", "杭州湾KHZ", "高新KGX", "奉化KFH", "宁波虚拟（集团）KKH", "宁波虚拟（公众）KSC"],
  "温州": ["全部", "永嘉县BYJ", "文成县BWC", "泰顺县BTS", "瑞安市BRA", "平阳县BPY", "瓯海区BOH", "鹿城区BWZ", "龙湾区BLW", "龙港BLG", "乐清市BYQ", "洞头区BDT", "苍南县BCN", "温州虚拟（集团）BJT", "温州虚拟（公众）B00"],
  "绍兴": ["全部", "诸暨市F05", "越城区F10", "新昌县F04", "嵊州市F03", "上虞区F02", "绍兴柯桥F06", "绍兴虚拟（集团）FJT", "绍兴虚拟（公众）F16"],
  "湖州": ["全部", "织里DZL", "长兴DCX", "吴兴DHZ", "南浔DNX", "南太湖新区DTH", "德清DDQ", "安吉DAJ", "湖州虚拟（集团）D01", "湖州虚拟（公众）D00"],
  "嘉兴": ["全部", "桐乡市ETX", "濮院经营部EPY", "平湖市EPH", "嘉善县EJS", "海盐县EHY", "海宁市EHN", "禾城EJX", "嘉兴集客虚拟E01", "嘉兴公众虚拟ESC"],
  "金华": ["全部", "永康市IYK", "义乌市IYW", "婺城IWZ", "武义县IWY", "浦江县IPJ", "磐安县IPA", "兰溪市ILX", "东阳市IDY", "金东IJD", "金华虚拟（集团）IJT", "金华虚拟（公众）IJH"],
  "衢州": ["全部", "衢江CQJ", "龙游县CLY", "柯城CQZ", "开化县CKH", "江山市CJS", "常山县CCS", "衢州虚拟（集团）C01", "衢州虚拟（公众）C00"],
  "台州": ["全部", "玉环县GYH", "温岭市GWL", "天台县GTT", "三门县GSM", "路桥区GLQ", "临海市GLH", "椒江区GJJ", "黄岩区GHY", "仙居县GXJ", "集聚区GTW", "台州集客虚拟GSC", "台州公众虚拟GTZ"],
  "丽水": ["全部", "云和县HYH", "遂昌县HSC", "松阳县HSY", "庆元县HQY", "青田县HQT", "景宁县HJN", "缙云县HJY", "龙泉市HLQ", "莲都区HLD", "南城区HNC", "丽水虚拟（集团）H01", "丽水虚拟（公众）H00"],
  "舟山": ["全部", "嵊泗县JSS", "普陀JPT", "定海JDH", "岱山县JDS", "新城区JXC", "舟山虚拟（集团）J01", "舟山虚拟（公众）JZS"]
};
// 监听市下拉框变化
citySelect.addEventListener("change", function () {
  const selectedCity = this.value; // 获取当前选择的市
  countySelect.innerHTML = '<option value="">请选择</option>'; // 清空区/县下拉框

  if (selectedCity && cityCountyMap[selectedCity]) {
      // 根据选择的市，动态加载对应的区/县选项
      cityCountyMap[selectedCity].forEach(county => {
          const option = document.createElement("option");
          option.value = county;
          option.textContent = county;
          countySelect.appendChild(option);
      });
  }
});

//-------------------------------------------------------对接后端-----------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {

    let currentLevel = 'province'; // 当前查询层级

    // 🚀 加载省份
    fetch("/api/province/distinctProvinces")
        .then(response => response.json())
        .then(data => {
            data.forEach(province => {
                let option = document.createElement("option");
                option.value = province;
                option.textContent = province;
                provinceSelect.appendChild(option);
            });
        });
    
    // 🚀 加载城市
    fetch("/api/city/distinctCities")
        .then(response => response.json())
        .then(data => {
            data.forEach(city => {
                let option = document.createElement("option");
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
        });

    // 🚀 加载区县
    fetch("/api/county/distinctCounties")
        .then(response => response.json())
        .then(data => {
            data.forEach(county => {
                let option = document.createElement("option");
                option.value = county;
                option.textContent = county;
                countySelect.appendChild(option);
            });
        });

    // 🚀 加载指标
    fetch("/api/province/distinctIndicators")
        .then(response => response.json())
        .then(data => {
            data.forEach(indicator => {
                let option = document.createElement("option");
                option.value = indicator;
                option.textContent = indicator;
                indicatorSelect.appendChild(option);
            });
        });

    // 🚀 查询按钮点击事件
    searchButton.addEventListener("click", function () {
      const province = provinceSelect.value;
      const city = citySelect.value;
      const county = countySelect.value;
      const indicator = indicatorSelect.value;
    
      if (!indicator) {
          alert("请选择指标！");
          return;
      }
    
      // 独立判断层级
      let apiUrl;
      if (county) {
          apiUrl = `/api/county/data?county=${county}&indicator=${indicator}`;
      } else if (city) {
          apiUrl = `/api/city/data?city=${city}&indicator=${indicator}`;
      } else if (province) {
          apiUrl = `/api/province/data?province=${province}&indicator=${indicator}`;
      } else {
          alert("请至少选择省、市或区县中的一个！");
          return;
      }
    
      fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
              // 重构数据结构
              const transformed = transformData(data);
              renderTable(transformed);
          })
          .catch(error => console.error("数据加载失败", error));
    });
    
    // 数据结构转换函数
    function transformData(rawData) {
      const result = {
          indicator: "",
          dates: [],
          regions: []
      };
    
      // 获取所有唯一日期
      const dateSet = new Set();
      const regionMap = new Map();
    
      rawData.forEach(item => {
          // 记录指标名称
          result.indicator = item.indicator;
          
          // 获取地区名称
          const regionName = item.province || item.city || item.county;
          
          // 记录日期
          dateSet.add(item.date);
          
          // 构建地区数据
          if (!regionMap.has(regionName)) {
              regionMap.set(regionName, {
                  name: regionName,
                  values: {}
              });
          }
          regionMap.get(regionName).values[item.date] = item.value;
      });
    
      // 转换数据结构
      result.dates = Array.from(dateSet).sort();
      result.regions = Array.from(regionMap.values());
    
      return result;
    }
    
    // 表格渲染函数
    function renderTable(data) {
      const table = document.createElement("table");
      const thead = document.createElement("thead");
      const tbody = document.createElement("tbody");
    
      // 构建表头
      const headerRow = document.createElement("tr");
      const indicatorHeader = document.createElement("th");
      indicatorHeader.textContent = data.indicator;
      headerRow.appendChild(indicatorHeader);
    
      data.dates.forEach(date => {
          const th = document.createElement("th");
          th.textContent = date;
          headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
    
      // 构建数据行
      data.regions.forEach(region => {
          const row = document.createElement("tr");
          const regionCell = document.createElement("td");
          regionCell.textContent = region.name;
          row.appendChild(regionCell);
    
          data.dates.forEach(date => {
              const td = document.createElement("td");
              const value = region.values[date] || "-";
              td.textContent = typeof value === "number" ? 
                  value.toLocaleString('zh-CN', { 
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                  }) : value;
              row.appendChild(td);
          });
    
          tbody.appendChild(row);
      });
    
      // 组合表格
      table.appendChild(thead);
      table.appendChild(tbody);
    
      // 更新DOM
      const resultPanel = document.getElementById("result-panel");
      resultPanel.innerHTML = "";
      resultPanel.appendChild(table);
    }
});
