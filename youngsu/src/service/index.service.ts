import express from 'express';
export async function index(req:express.Request,res:express.Response){
    console.log("Post index!");
    res.status(200).json("hi Postman");
}
export async function indexPage(req:express.Request,res:express.Response){
    res.render('indexPage');
}