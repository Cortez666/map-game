import { Provider } from "./components/ui/provider.tsx";
import { ResourcesProvider } from "./context/ResourcesContext.tsx";
import { StatsProvider } from "./context/StatsContext.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ResourcesProvider>
			<StatsProvider>
				<Provider>
					<App />
				</Provider>
			</StatsProvider>
		</ResourcesProvider>
	</StrictMode>
);
