import React from "react";
import {ToastAndroid} from "react-native";
import SQLiteStorage from 'react-native-sqlite-storage';
SQLiteStorage.DEBUG(true);

const sqliteConfig={
    db_name:"mon_db.db",
    db_version:"1.0",
    db_displayname:"MySQLite",
    db_size:-1
};
var db=null;

export default class SQLite extends React.PureComponent{
    constructor(props){
        super(props)
        console.log("初始化~~")
    }
    componentWillUnmount(){
        this.closeDB();
    }
    openDB(){//打开数据库
        db=SQLiteStorage.openDatabase(
            sqliteConfig.db_name,
            sqliteConfig.db_version,
            sqliteConfig.db_displayname,
            sqliteConfig.db_size,
            (res)=>{
                console.log("数据库打开成功!");
                console.log(res)
            },
            (err)=>{
                this._errorDB("数据打开"+err);
            }
        );
        return db;
    }
    createTable(){//创建数据库表phone
        if(!db){
            this.openDB();
        }else{
            return false;
        }
        db.transaction((tx)=>{
            tx.executeSql("CREATE TABLE IF NOT EXISTS phone("+
                "id INTERGER PRIMARY KEY,"+
                "name VARCHART(20) NOT NULL,"+
                "phone VARCHART(40) NOT NULL,"+
                "imgstr LONGTEXT)",
                [],
                (res)=>{
                    console.log("数据库表创建成功!");
                },
                (err)=>{
                    this._errorDB("数据库表创建",err);
                }
            )
        });
    }
    dbTable(){//删除数据库表phone
        db.transaction((tx)=>{
            tx.executeSql("DELETE FROM phone",
                [],
                ()=>{
                    this._successDB()
                },
                (err)=>{
                    this._errorDB("数据库删除",err)
                }
            )
        });
    }
    insertDataDB(data){//添加数据库表phone的数据
        if(data instanceof Array){
            if(data.length != 0){
                db.transaction((tx)=>{
                    data.forEach((item)=>{
                        const sql="INSERT INTO phone(name,phone,imgstr)"+
                                    "values(?,?,?)";
                        tx.executeSql(sql,[item.name,item.phone,item.imgstr],
                            ()=>{
                                console.log("数据插入成功!")
                            },
                            (err)=>{
                                this._errorDB("数据插入",err);
                            }
                        )
                        
                    })
                },()=>{
                    console.log(`数据插入${data.length}成功!`)
                },(error)=>{
                    console.log(error);
                })
            }
        }
    }
    deleteDataDB(data){//删除数据表phone的数据
        db.transaction((tx)=>{
            var name=data.name;
            var phoneStr=data.phone;
            var imgstr=data.imgstr;
            var sql="DELETE FROM phone WHERE phone="+phoneStr;
            tx.excute(sql,[],
                ()=>{
                    console.log("数据删除成功!");
                },
                (err)=>{
                    this._errorDB("数据删除",err);
                }
            )
        });
    }
    updateDataDB(data){//更新数据库表phone的数据
        db.transaction((tx)=>{
            var phoneStr=data.phone;
            var sql="UPDATE phone SET name="+name+",phone="+phoneStr+",imgstr="+imgstr+" WHERE phone="+phoneStr;
            tx.executeSql(sql,[],
                ()=>{
                    console.log("数据更新成功!")
                },
                (err)=>{
                    this._errorDB("数据删除",err);
                }
            )
        });
    }
    selectDataDB(data){
        db.transaction((tx)=>{
            var name=data.name;
            var phoneStr=data.phone;
            var sql="SELECT * FROM phone";
            tx.executeSql(sql,[],
                (res)=>{
                    console.log("查询success")
                    console.log(res)
                },
                (err)=>{
                    this._errorDB("数据查询",err);
                }
            )
        });
    }
    closeDB(){//关闭数据库
        db.close();
    }
    _successDB(db_name){
        console.log(`${sqliteConfig.db_name}数据库启动成功`);
    }
    _errorDB(title,err){
        console.error(`${title}Error:${err.message}`);
    }
}