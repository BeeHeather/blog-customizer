import { useState, useEffect, FormEvent } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import clsx from 'clsx';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
	defaultArticleState,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onToggle: () => void;
	onApply: (params: ArticleStateType) => void;
	onReset: () => void;
	initialParams: ArticleStateType;
};

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
	onApply,
	onReset,
	initialParams,
}: ArticleParamsFormProps) => {
	const [params, setParams] = useState(defaultArticleState);

	useEffect(() => {
		if (isOpen) {
			setParams(initialParams);
		}
	}, [isOpen, initialParams]);

	function handleChange(key: keyof typeof params) {
		return function (value: OptionType) {
			setParams((prev) => ({
				...prev,
				[key]: value,
			}));
		};
	}

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		onApply(params);
	}

	function handleReset() {
		setParams(initialParams);
		onReset();
	}

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select
						selected={params.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						selected={params.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChange('fontSizeOption')}
						title='Размер шрифта'
					/>
					<Select
						selected={params.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={params.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
						title='Цвет фона'
					/>
					<Select
						selected={params.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
