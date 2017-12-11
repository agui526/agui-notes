class Node {
	constructor(data, left, right) {
		this.data = data
		this.left = left
		this.right = right
	}
}

class BST {
	constructor() {
		this.root = null
	}
	
	insert(data) {
		let node = new Node(data)
		if(!this.root) {
			this.root = node
		} else {
			let currNode = this.root
			while(true) {
				if(data < currNode.data) {
					if(!currNode.left) {
						currNode.left = node
						break
					}
					currNode = currNode.left
				} else if(data > currNode.data) {
					if(!currNode.right) {
						currNode.right = node
						break
					}
					currNode = currNode.right
				}
			}
		}
	}
	//中序遍历
	inOrder(node = this.root) {
		if(node) {
			this.inOrder(node.left)
			console.log(node.data)
			this.inOrder(node.right)
		}
	}
	//前序遍历
	preOrder(node = this.root) {
		if(node) {
			console.log(node.data)
			this.preOrder(node.left)
			this.preOrder(node.right)
		}
	}
	//后序遍历
	postOrder(node = this.root) {
		if(node) {
			this.postOrder(node.left)
			this.postOrder(node.right)
			console.log(node.data)
		}
	}
	
	getMin() {
		let currNode = this.root
		while(currNode.left) {
			currNode = currNode.left
		}
		return currNode.data
	}
	
	getMax() {
		let currNode = this.root
		while(currNode.right) {
			currNode = currNode.right
		}
		return currNode.data
	}
	
	find(data) {
		let currNode = this.root
		while(currNode) {
			if(currNode.data === data) {
				return currNode
			} else if(data < currNode.data) {
				currNode = currNode.left
			} else {
				currNode = currNode.right
			}
		}
		return null
	}
	
	findParentNode(data) {
		//if(this.root.data === data) return this.root
		let currNode = this.root
		while(currNode) {
			if(currNode.left.data === data || currNode.right.data === data) {
				return currNode
			} else if(data < currNode.left.data) {
				currNode = currNode.left
			} else {
				currNode = currNode.right
			}
		}
		return null
	}
	
	remove(data) {
		let tmpNode = this.find(data)
		let tmpParentNode = this.findParentNode(data)
		if(!tmpNode) {
			return null
		} else {
			if(!tmpNode.left && !tmpNode.right) { //左节点和右节点都是叶子节点
				if(tmpNode === tmpParentNode.left) {
					tmpParentNode.left = null
					return tmpNode
				} else if(tmpNode === tmpParentNode.right) {
					tmpParentNode.right = null
					return tmpNode
				}
				return null
			}
			if(!tmpNode.left) { //右节点不是叶子节点
				tmpParentNode.left = tmpNode.right
				return tmpNode
			}
			if(!tmpNode.right) { //左节点不是叶子节点
				tmpParentNode.left = tmpNode.left
				return tmpNode
			}
		}
	}
}

var bst = new BST()
bst.insert(10);
bst.insert(7);
bst.insert(5);
bst.insert(8);
bst.insert(16);
bst.insert(12);
bst.insert(20);

bst.inOrder()
bst.preOrder()
bst.postOrder()

bst.getMin()
bst.getMax()

bst.find(6)


function remove(data) {
	root = removeNode(this.root, data);
}

function removeNode(node, data) {
	if (node == null) {
		return null;
	}
	if (data == node.data) {
		// 没有子节点的节点
		if (node.left == null && node.right == null) {
			return null;
		}
		// 没有左子节点的节点
		if (node.left == null) {
			return node.right;
		}
		// 没有右子节点的节点
		if (node.right == null) {
			return node.left;
		}
		// 有两个子节点的节点
		var tempNode = getSmallest(node.right);
		node.data = tempNode.data;
		node.right = removeNode(node.right, tempNode.data);
		return node;
	} else if (data < node.data) {
		node.left = removeNode(node.left, data);
		return node;
	} else {
		node.right = removeNode(node.right, data);
		return node;
	}
}