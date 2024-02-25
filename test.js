/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number[]} queries
 * @return {number[][]}
 */
var closestNodes = function (root, queries) {
  const clone = [...queries]
  const mp = {}
  for (let i = 0; i < queries.length; i++) {
    mp[queries[i]] = i
  }
  queries.sort((a, b) => a - b)

  const len = queries.length
  const res = new Array(len)
  for (let i = 0; i < len; i++) {
    res[i] = [-1, -1]
  }

  let minIndex = 0
  let maxIndex = 0
  let pre = -1

  const dfs = (node) => {
    if (node.left) {
      dfs(node.left)
    }

    const minStart = minIndex
    while (minIndex < len && queries[minIndex] < node.val) {
      minIndex++
    }

    const maxStart = maxIndex
    while (maxIndex < len && queries[maxIndex] <= node.val) {
      maxIndex++
    }

    for (let i = minStart; i < minIndex; i++) {
      res[i][0] = pre ?? -1
    }

    for (let i = maxStart; i < maxIndex; i++) {
      res[i][1] = node.val
    }

    pre = node.val

    if (node.right) {
      dfs(node.right)
    }
  }

  dfs(root)

  while (minIndex < len && queries[minIndex] >= pre) {
    res[minIndex][0] = pre ?? -1
    minIndex++
  }

  const resMp = {}
  queries.forEach((query, index) => {
    resMp[query] = res[index]
  })

  const ans = new Array(len).fill(0)
  clone.forEach((item) => {
    ans.push(resMp[item])
  })

  return ans
}
