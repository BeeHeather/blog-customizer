import { CSSProperties, useState } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';
import '../../styles/index.scss';
import styles from './index.module.scss';

export default function App() {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [currentParams, setCurrentParams] = useState(defaultArticleState);
	const [initialParams, setInitialParams] = useState(defaultArticleState);

	const handleToggleForm = () => {
		if (!isFormOpen) {
			setInitialParams(defaultArticleState);
		}
		setIsFormOpen(!isFormOpen);
	};

	const handleApply = (params: ArticleStateType) => {
		setCurrentParams(params);
	};

	const handleReset = () => {
		setCurrentParams(defaultArticleState);
	};

	return (
		<main
			className={styles.main}
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
}
