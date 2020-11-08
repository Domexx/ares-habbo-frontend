import { Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';
import { Article, ArticlePagination } from '../model/article';
import { ArticleService } from '../service/article.service';

@Pipe({
  name: 'searchArticle',
})
export class SearchArticlePipe implements PipeTransform {
  constructor(private articleService: ArticleService) {}

  transform(value: any, args?: string): Article[] {
    if (!args) {
      return value;
    }

    args = args.toLowerCase();

    let articles: Article[] = [];

    const subscription = this.articleService.search(args).subscribe({
      next: (resp) => (articles = resp.data),
      complete: () => subscription.unsubscribe(),
    });

    return articles;
  }
}
