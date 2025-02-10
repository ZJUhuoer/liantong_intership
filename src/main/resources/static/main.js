document.addEventListener("DOMContentLoaded", function () {
    const provinceSelect = document.getElementById("province");
    const indicatorSelect = document.getElementById("indicator");
    const searchButton = document.getElementById("search-btn");
    const tableBody = document.getElementById("data-table");

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
        const indicator = indicatorSelect.value;

        if (!province || !indicator) {
            alert("请选择省份和指标！");
            return;
        }

        fetch(`/api/province/data?province=${province}&indicator=${indicator}`)
            .then(response => response.json())
            .then(data => {
                tableBody.innerHTML = ""; // 清空旧数据
                data.forEach(item => {
                    let row = document.createElement("tr");
                    row.innerHTML = `<td>${item.province}</td><td>${item.indicator}</td><td>${item.date}</td><td>${item.value}</td>`;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => console.error("数据加载失败", error));
    });
});
