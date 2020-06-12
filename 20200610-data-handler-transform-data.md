# data-handler-transform-data

> 参考链接：https://github.com/azl397985856/fe-interview/issues/2

### 题目

已知数据格式：

```
const userToSkill = {
  robert: ["programming", "design", "reactjs"],
  kimia: ["java", "backend", "services"],
  patrick: ["reactjs"],
  chris: ["reactjs", "programming"]
};
```

转化成

```
const skillToUser = {
  programming: ["robert", "chris"],
  reactjs: ["patrick", "robert", "chris"],
  java: ["kimia"],
  backend: ["kimia"],
  services: ["kimia"],
  design: ["robert"]
};
```

扩展：

```
完成函数：找到具有相似技能的用户
function setOfUsersWithSimillarSkills(userToSkill) {

}
期望输出： ["robert", "chris"]
```



### 解题

#### 思路

* 双层嵌套遍历即可

#### 代码

```
function transformSkillToUser(userToSkill) {
  let result = {}
  for(let user in userToSkill) {
    userToSkill[user].forEach(skill => {
      if(result[skill] === void 0) {
      	result[skill] = [user]
      }else {
      	result[skill].push(item)
    	}
    })
  }
  return result
}
```



### 思考



### 扩展

* 扩展：https://github.com/DevilRoshan/Question/issues/39