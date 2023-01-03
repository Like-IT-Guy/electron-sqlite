var jobExecution = false;
//Check Internet Status
const updateOnlineStatus = () => {
    document.getElementById('status').innerHTML = navigator.onLine ? 'online' : 'offline';

    if (navigator.onLine && jobExecution == true) {
        $("#processing-spinner").show();
        var response = window.api.getTestApiList();
        const printAddress = async () => {
            const result = await response;
            console.log(result.data.data);
            var rows = result.data.data;
            for (let i = 0; i < rows.length; i++) {
                // console.log(rows[i].id);
                window.api.addName(rows[i].name.replace(/[^a-zA-Z ]/g, ""));
            }
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: rows.length + " Rows Inserted",
            });

            let testList = window.api.TestGetList();
            let element = document.getElementById('tdata');
            let data = testList.map((e) => {
                var html = "<tr><td>"
                    + e.id + "</td>"
                    + "<td>" + e.name
                    + "</td></tr>";
                return html;
            }).join("</br>");

            $('#data-table').DataTable().destroy();
            element.innerHTML = data;
            $('#data-table').DataTable({
                responsive: true,
                order: [[0, 'desc']],
            }).draw();

            $("#processing-spinner").hide();
        };
        printAddress();
    }
    else {
        jobExecution = true;
    }
}

window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)

updateOnlineStatus();

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

document.querySelector('#upload').addEventListener('change', async () => {
    const file = document.querySelector('#upload').files[0];
    window.api.addImage(await toBase64(file));

    Swal.fire({
        icon: 'success',
        title: 'Success',
        text: "New Image Inserted",
    });

    let imageList = window.api.ImageGetList();
    let iamgeelement = document.getElementById('imagetdata');
    let idata = imageList.map((e) => {
        var html = "<tr><td>"
            + e.id + "</td>"
            + "<td><a class='btn btn-primary' href='" + e.image
            + "' download>Download Image</a></td></tr>";
        return html;
    }).join("</br>");

    $('#image-data-table').DataTable().destroy();
    iamgeelement.innerHTML = idata;

    $("#image-data-table").DataTable({
        responsive: true,
        order: [[0, 'desc']],
    });
});

document.addEventListener('DOMContentLoaded', async () => {
    let testList = window.api.TestGetList();
    let element = document.getElementById('tdata');
    let data = testList.map((e) => {
        var html = "<tr><td>"
            + e.id + "</td>"
            + "<td>" + e.name
            + "</td></tr>";
        return html;
    }).join("</br>");

    element.innerHTML = data;

    $("#data-table").DataTable({
        responsive: true,
        order: [[0, 'desc']],
    });
    
    let imageList = window.api.ImageGetList();
    let iamgeelement = document.getElementById('imagetdata');
    let idata = imageList.map((e) => {
        var html = "<tr><td>"
            + e.id + "</td>"
            + "<td><a class='btn btn-primary' href='" + e.image
            + "' download>Download Image</a></td></tr>";
        return html;
    }).join("</br>");

    iamgeelement.innerHTML = idata;

    $("#image-data-table").DataTable({
        responsive: true,
        order: [[0, 'desc']],
    });

    document.querySelector('#btnEd').addEventListener('click', () => {
        var name = document.getElementById("name").value;

        if (name != "") {
            window.api.addName(name);
            document.getElementById("name").value = "";
            document.getElementById("name").focus();

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: "New Name Inserted",
            });

            let testList = window.api.TestGetList();
            let element = document.getElementById('tdata');
            let data = testList.map((e) => {
                var html = "<tr><td>"
                    + e.id + "</td>"
                    + "<td>" + e.name
                    + "</td></tr>";
                return html;
            }).join("</br>");

            $('#data-table').DataTable().destroy();
            element.innerHTML = data;
            $('#data-table').DataTable({
                responsive: true,
                order: [[0, 'desc']],
            }).draw();
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: "Please Enter Name",
            });
        }

    });

    document.querySelector('#btnSn').addEventListener('click', () => {
        $("#processing-spinner").show();
        var response = window.api.getTestApiList();
        const printAddress = async () => {
            const result = await response;
            console.log(result.data.data);
            var rows = result.data.data;
            for (let i = 0; i < rows.length; i++) {
                // console.log(rows[i].id);
                window.api.addName(rows[i].name.replace(/[^a-zA-Z ]/g, ""));
            }
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: rows.length + " Rows Inserted",
            });

            let testList = window.api.TestGetList();
            let element = document.getElementById('tdata');
            let data = testList.map((e) => {
                var html = "<tr><td>"
                    + e.id + "</td>"
                    + "<td>" + e.name
                    + "</td></tr>";
                return html;
            }).join("</br>");

            $('#data-table').DataTable().destroy();
            element.innerHTML = data;
            $('#data-table').DataTable({
                responsive: true,
                order: [[0, 'desc']],
            }).draw();

            $("#processing-spinner").hide();
        };
        printAddress();
    });

    document.querySelector('#btnSend').addEventListener('click', () => {
        $("#processing-spinner").show();
        let testList = window.api.TestGetList();
        var dataArray =[];
        testList.map((e) => {
            dataArray.push({ name : e.name});
        });
        var response = window.api.sendData({data : dataArray});
        const printAddress = async () => {
            const result = await response;
            console.log(result);
            $("#processing-spinner").hide();

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: "Data send to live database",
            });
        };
        printAddress();
    });
});