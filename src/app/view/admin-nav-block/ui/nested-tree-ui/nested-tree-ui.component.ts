import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {NestedTreeNode} from "../../models/nested-tree-node";

@Component({
  selector: 'app-nested-tree-ui',
  templateUrl: './nested-tree-ui.component.html',
  styleUrls: ['./nested-tree-ui.component.scss']
})
export class NestedTreeUiComponent implements OnChanges {
  @Input() nodes: NestedTreeNode[] = [];

  treeControl = new NestedTreeControl<NestedTreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<NestedTreeNode>();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nodes) {
      this.dataSource.data = this.nodes;
    }
  }

  hasChild = (_: number, node: NestedTreeNode) => !!node.children && node.children.length > 0;
}
