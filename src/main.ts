import { Notice, Plugin, WorkspaceLeaf} from 'obsidian';
import { ExampleView,VIEW_TYPE_EXAMPLE } from './view/example-view';

export default class DotPlugin extends Plugin {

	async onload() {
		this.registerView(
			VIEW_TYPE_EXAMPLE,
			(leaf) => new ExampleView(leaf)
		  );
		  
		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('rabbit', 'Greet', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			//this.activateView();
			new Notice("Hei!");
		});	  
		const item = this.addStatusBarItem();
		item.createEl("span", { text: "Hello from the status bar 👋" });
	}
	async onunload() {
	}
  
	async activateView() {
	  const { workspace } = this.app;
  
	  let leaf: WorkspaceLeaf | null = null;
	  const leaves = workspace.getLeavesOfType(VIEW_TYPE_EXAMPLE);
  
	  if (leaves.length > 0) {
		// A leaf with our view already exists, use that
		leaf = leaves[0];
	  } else {
		// Our view could not be found in the workspace, create a new leaf
		// in the right sidebar for it
		leaf = workspace.getRightLeaf(false);
		await leaf.setViewState({ type: VIEW_TYPE_EXAMPLE, active: true });
	  }
  
	  // "Reveal" the leaf in case it is in a collapsed sidebar
	  workspace.revealLeaf(leaf);
	}

}