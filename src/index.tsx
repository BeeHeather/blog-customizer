import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [currentParams, setCurrentParams] = useState(defaultArticleState);
	const [initialParams, setInitialParams] = useState(defaultArticleState);

	const handleToggleForm = () => {
		if (!isFormOpen) {
			setInitialParams(currentParams);
		}
		setIsFormOpen(!isFormOpen);
	};

	const handleApply = (params: ArticleStateType) => {
		setCurrentParams(params);
	};

	const handleReset = () => {
		setCurrentParams(initialParams);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': currentParams.fontFamilyOption.value,
					'--font-size': currentParams.fontSizeOption.value,
					'--font-color': currentParams.fontColor.value,
					'--container-width': currentParams.contentWidth.value,
					'--bg-color': currentParams.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isFormOpen}
				onToggle={handleToggleForm}
				onApply={handleApply}
				onReset={handleReset}
				initialParams={initialParams}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
