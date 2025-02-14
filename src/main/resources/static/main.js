document.addEventListener("DOMContentLoaded", function () {
    const tableSelect = document.getElementById("table");
    const locationSelect = document.getElementById("location");
    const indicatorSelect = document.getElementById("indicator");
    const searchButton = document.getElementById("search-btn");
    const tableBody = document.getElementById("data-table");

    // 🚀 根据表格类型加载对应的地区（省市县）
    function loadLocations(table) {
        fetch(`/api/${table}/distinct${table.charAt(0).toUpperCase() + table.slice(1)}s`)  // 确保路径正确
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    locationSelect.innerHTML = '<option value="">请选择</option>'; // 清空现有选项
                    data.forEach(location => {
                        let option = document.createElement("option");
                        option.value = location;
                        option.textContent = location;
                        locationSelect.appendChild(option);
                    });
                    // 加载对应的指标
                    loadIndicators(table);
                } else {
                    console.error("返回的数据格式不正确", data);
                }
            })
            .catch(error => console.error("加载地区失败", error));
    }

// 🚀 加载指标（根据表格类型动态加载）
    function loadIndicators(table) {
        fetch(`/api/${table}/distinctIndicators`)  // 这里加载的是指标
            .then(response => response.json())
            .then(data => {
                indicatorSelect.innerHTML = '<option value="">请选择</option>'; // 清空现有选项
                data.forEach(indicator => {
                    let option = document.createElement("option");
                    option.value = indicator;
                    option.textContent = indicator;
                    indicatorSelect.appendChild(option);
                });
            })
            .catch(error => console.error("加载指标失败", error));
    }

    // 🚀 监听表格选择框变化
    tableSelect.addEventListener("change", function () {
        const selectedTable = tableSelect.value;
        if (selectedTable) {
            loadLocations(selectedTable); // 加载相应的地区和指标
        } else {
            locationSelect.innerHTML = '<option value="">请选择</option>';
            indicatorSelect.innerHTML = '<option value="">请选择</option>';
        }
    });

    // 🚀 查询按钮点击事件
    searchButton.addEventListener("click", function () {
        const table = tableSelect.value;
        const location = locationSelect.value;
        const indicator = indicatorSelect.value;

        if (!table || !location || !indicator) {
            alert("请选择表格、地区和指标！");
            return;
        }

        fetch(`/api/${table}/data?${table}=${location}&indicator=${indicator}`)
            .then(response => response.json())
            .then(data => {
                tableBody.innerHTML = ""; // 清空旧数据
                data.forEach(item => {
                    let row = document.createElement("tr");
                    row.innerHTML = `<td>${item[table]}</td><td>${item.indicator}</td><td>${item.date}</td><td>${item.value}</td>`;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => console.error("数据加载失败", error));
    });
});
