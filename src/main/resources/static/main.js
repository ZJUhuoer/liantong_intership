document.addEventListener("DOMContentLoaded", function () {
    const tableSelect = document.getElementById("table");
    const locationSelect = document.getElementById("location");
    const indicatorSelect = document.getElementById("indicator");
    const searchButton = document.getElementById("search-btn");
    const tableBody = document.getElementById("data-table");
    const showLineChartBtn = document.getElementById("show-line-chart-btn");

    let chart = null;  // 保存折线图的实例

    // 🚀 根据表格类型加载对应的地区（省市县）
    function loadLocations(table) {
        fetch(`/api/${table}/distinct${table.charAt(0).toUpperCase() + table.slice(1)}s`)
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
                    loadIndicators(table);
                } else {
                    console.error("返回的数据格式不正确", data);
                }
            })
            .catch(error => console.error("加载地区失败", error));
    }

    // 🚀 加载指标（根据表格类型动态加载）
    function loadIndicators(table) {
        fetch(`/api/${table}/distinctIndicators`)
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

                // 确保数据加载后显示折线图按钮
                if (data.length > 0) {
                    showLineChartBtn.style.display = "inline-block";  // 显示按钮
                    window.chartData = data;  // 存储数据用于后续折线图显示
                } else {
                    showLineChartBtn.style.display = "none";  // 如果没有数据，隐藏按钮
                }
            })
            .catch(error => console.error("数据加载失败", error));
    });

    // 🚀 显示折线图
    showLineChartBtn.addEventListener("click", function () {
        const data = window.chartData;
        const labels = data.map(item => item.date);
        const values = data.map(item => item.value);

        // 如果已经有图表实例，先销毁它
        if (chart) {
            chart.destroy();  // 销毁当前图表
        }

        // 创建新的折线图
        const ctx = document.getElementById('lineChart').getContext('2d');
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: '数值变化',
                    data: values,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: '日期'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: '数值'
                        }
                    }
                }
            }
        });

        // 显示模态框
        document.getElementById('line-chart-modal').style.display = "block";
    });

    // 🚀 关闭模态框
    document.getElementById("close-modal-btn").addEventListener("click", function () {
        document.getElementById('line-chart-modal').style.display = "none";
    });

    // 🚀 点击模态框外部区域关闭模态框
    window.addEventListener("click", function (event) {
        if (event.target === document.getElementById('line-chart-modal')) {
            document.getElementById('line-chart-modal').style.display = "none";
        }
    });
});
