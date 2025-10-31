import { Provider } from "./components/ui/provider.tsx";
import { ResourcesProvider } from "./context/ResourcesContext.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ResourcesProvider>
			<Provider>
				<App />
			</Provider>
		</ResourcesProvider>
	</StrictMode>
);
