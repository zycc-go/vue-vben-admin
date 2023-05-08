interface TreeConfigOptions {
  childProps: string;
}

/**
 * @description 遍历树形结构，并返回所有节点中指定的值。
 * @param tree 树形结构数组
 * @param getValue 获取节点值的函数
 * @param childProps 作为子节点数组的可选属性名称。
 * @returns 所有节点中指定的值的数组
 */
function traverseTreeValues<T, V>(
  tree: T[],
  getValue: (node: T) => V,
  options: TreeConfigOptions = {
    childProps: 'children',
  },
): V[] {
  const result: V[] = [];
  const { childProps } = options;

  const dfs = (treeNode: T) => {
    const value = getValue(treeNode);
    result.push(value);
    const children = treeNode?.[childProps];
    if (!children) {
      return;
    }
    if (children.length) {
      for (const child of children) {
        dfs(child);
      }
    }
  };

  for (const treeNode of tree) {
    dfs(treeNode);
  }
  return result.filter(Boolean);
}

/**
 * 根据条件过滤给定树结构的节点，并以原有顺序返回所有匹配节点的数组。
 * @param treeNodes 要过滤的树结构的根节点数组。
 * @param predicate 用于匹配每个节点的条件。
 * @param childProps 作为子节点数组的可选属性名称。
 * @returns 包含所有匹配节点的数组。
 */
function filterTree<T>(
  tree: T[],
  predicate: (node: T) => boolean,
  options: TreeConfigOptions = {
    childProps: 'children',
  },
): T[] {
  const { childProps } = options;
  const _filterTree = (nodes: T[]): T[] => {
    return nodes.filter((node) => {
      if (predicate(node)) {
        if (node[childProps]) {
          node[childProps] = _filterTree(node[childProps]);
        }
        return true;
      }
      return false;
    });
  };

  return _filterTree(tree);
}

/**
 * 根据条件重新映射给定树结构的节
 * @param tree 要过滤的树结构的根节点数组。
 * @param mapper 用于map每个节点的条件。
 * @param childProps 作为子节点数组的可选属性名称。
 */
function mapTree<T>(
  tree: T[],
  mapper: (node: T) => T,
  options: TreeConfigOptions = {
    childProps: 'children',
  },
): T[] {
  const { childProps } = options;
  return tree.map((node) => {
    const mapperNode = mapper(node);
    if (mapperNode[childProps]) {
      mapperNode[childProps] = mapTree(mapperNode[childProps], mapper, options);
    }
    return mapperNode;
  });
}

export { filterTree, mapTree, traverseTreeValues };
