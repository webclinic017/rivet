import { EmbedDetector } from "@/components/EmbedDetector";
import { Footer } from "@/components/Footer";
import "@/styles/v2.css";

export default function Layout({ children }) {
	return (
		<>
			{children}
			<EmbedDetector />
			<Footer />
		</>
	);
}
