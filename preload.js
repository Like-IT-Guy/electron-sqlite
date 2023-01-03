// const path = require('path');
const nodePath = require("path");
const Test = require(nodePath.join(__dirname, './models/testmgr'));
const Image = require(nodePath.join(__dirname, './models/imagesmgr'));
const TestApi = require(nodePath.join(__dirname, './api/test'));

const {contextBridge} = require('electron');

//Test Model
const TestGetList = () => {
    return Test.getList();
}

const addName = (name) => {
    Test.addName(name);
}

//Image Model
const ImageGetList = () => {
    return Image.getList();
}

const addImage = (image) => {
    Image.addImage(image);
}

//Test Api
const getTestApiList = () => {
    return TestApi.getTestApiList();
}

const sendData = (data) => {
    return TestApi.sendData(data);
}

//Send Methods To Front End
contextBridge.exposeInMainWorld('api', {
    TestGetList: TestGetList,
    addName: addName,
    getTestApiList: getTestApiList,
    sendData: sendData,
    ImageGetList: ImageGetList,
    addImage: addImage,
})

