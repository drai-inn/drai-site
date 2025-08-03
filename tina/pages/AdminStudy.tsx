import React from 'react';
import { tinaField, useTina } from "tinacms/dist/react";
import type { CaseQuery, CaseQueryVariables } from '../__generated__/types';
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import FormattedDate from '../../src/components/react/FormattedDate.tsx';
import ReactMarkdown from 'react-markdown';


type Props = {
	variables: CaseQueryVariables;
	data: CaseQuery;
	query: string;
}

export default function AdminStudy(props: Props) {

	const { data } = useTina({
		query: props.query,
		variables: props.variables,
		data: props.data,
	})

	const study = data.case;

	// Helper to fix image paths with base URL
	const getImageSrc = (heroImage: string) => {
		// If image starts with /, prepend base URL
		if (heroImage?.startsWith('/')) {
			const baseUrl = (import.meta.env?.BASE_URL || '/').replace(/\/$/, '');
			return baseUrl + heroImage;
		}
		return heroImage; // Return as-is for external URLs or relative paths
	};

	return (
		<article>
			<div data-tina-field={tinaField(study, "heroImage")} className="hero-image">
				{study.heroImage && <img width={1020} height={510} src={getImageSrc(study.heroImage)} alt="" />}
			</div>
			<div className="prose">
				<div className="title">
					<div className="date" data-tina-field={tinaField(study, "pubDate")} >
						<FormattedDate date={study.pubDate} />
						{
							study.updatedDate && (
								<div className="last-updated-on" data-tina-field={tinaField(study, "updatedDate")} >
									Last updated on <FormattedDate date={study.updatedDate} />
								</div>
							)
						}
					</div>
					<h1 data-tina-field={tinaField(study, "title")} >{study.title}</h1>
					<hr />
				</div>
				<div data-tina-field={tinaField(study, "body")}>
					{typeof study.body === 'string' ? (
						<ReactMarkdown>{study.body}</ReactMarkdown>
					) : (
						<TinaMarkdown content={study.body} />
					)}
				</div>
			</div>
		</article>
	);
}
