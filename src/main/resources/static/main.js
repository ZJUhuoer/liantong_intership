document.addEventListener("DOMContentLoaded", function () {
    const provinceSelect = document.getElementById("province");
    const citySelect = document.getElementById("city");
    const countySelect = document.getElementById("county");
    const indicatorSelect = document.getElementById("indicator");
  
    const searchButton = document.getElementById("search-btn");
    const tableBody = document.getElementById("data-table");

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
              tableBody.innerHTML = "";
              data.forEach(item => {
                  let row = document.createElement("tr");
                  // 根据实际字段调整（假设不同层级返回不同region字段）
                  row.innerHTML = `
                      <td>${item.province || item.city || item.county}</td>
                      <td>${item.indicator}</td>
                      <td>${item.date}</td>
                      <td>${item.value}</td>
                  `;
                  tableBody.appendChild(row);
              });
          })
          .catch(error => console.error("数据加载失败", error));
    });
});
