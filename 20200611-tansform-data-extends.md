# transform-data-extends

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

扩展：

```
完成函数：找到具有相似技能的用户
function setOfUsersWithSimillarSkills(userToSkill) {

}
期望输出： ["robert", "chris"]
```



### 解题

#### 思路

* 首先题目我并没又太理解，我简单理解为拥有相似技能的用户，输出拥有相似集能最多的用户组
* 先嵌套遍历，得到技能对应用户的map
* 统计每个用户的每个技能有多少相关用户，建立用户对用户拥有相同技能的map
* 最后读取map得到最相似的用户

#### 代码

```
function transformSkillToUser(userToSkill) {
  let result = {}
  for(let user in userToSkill) {
    userToSkill[user].forEach(skill => {
      if(result[skill] === void 0) {
      	result[skill] = [user]
      }else {
      	result[skill].push(user)
    	}
    })
  }
  return result
}

function transformUserToUser(userToSkill, SkillToUser) {
  let result = {}
  for(let user in userToSkill) {
    userToSkill[user].forEach(skill => {
      result[user] = SkillToUser[skill].reduce((acc, cur) => {
      	if(cur === user){
      		return acc
				}
      	acc[cur] = (acc[cur] || 0) + 1;
				return acc
      }, result[user] || {})
    })
  }
  return result
}

function setOfUsersWithSimillarSkills(userToSkill) {
	const skillToUser = transformSkillToUser(userToSkill);console.log(skillToUser)
	const userToUser = transformUserToUser(userToSkill, skillToUser);console.log(userToUser)
	let arr = Object.keys(userToUser), maxValue = 0, maxArr = [];
	for(let i = 0; i < arr.length; i++){
		for(let j = i+1; j < arr.length; j++){
			console.log(arr[i], arr[j])
			if(userToUser[arr[i]][arr[j]] > maxValue){
				maxValue = userToUser[arr[i]][arr[j]];
				maxArr = [[arr[i], arr[j]]];
				continue;
			}
			if(userToUser[arr[i]][arr[j]] === maxValue){
				maxArr.push([arr[i], arr[j]])
			}
		}
	}
	return maxArr
}
```



### 思考

* 参考题解是通过遍历回溯然后找到公共子集？然后生成一个一个set，最后找出最长的set，并不理解这么做的原因和结果的合理性，等看明白回溯法的作用也许会有所思考，这里暂时存疑

### 扩展

* 题解中的backtrack回溯法解题看明白了却并不知道用处，接下来遇到类似的题要仔细看看