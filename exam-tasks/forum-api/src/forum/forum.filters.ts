import { Forum, OrderBy, StoredForum } from './forum.dto';

type ForumFilter = (forum: Forum) => boolean;
type Comperator = (a: Forum, b: Forum) => number;

export enum DateCompare {
  AFTER = 1,
  BEFORE = -1,
}

export class ForumFilters {
  constructor(private lang: string) {}

  byQuery(query?: string): ForumFilter {
    if (!query) {
      return Boolean;
    }
    const search = query.toLocaleLowerCase(this.lang);
    return ({ title, description, comments }: Forum) => (
      title.toLocaleLowerCase(this.lang).indexOf(search) > -1 ||
      description.toLocaleLowerCase(this.lang).indexOf(search) > -1 ||
      comments.some((comment) => comment.message.toLocaleLowerCase(this.lang).indexOf(search) > -1)
    );
  }

  byTitle(query: string): ForumFilter {
    const search = query.toLocaleLowerCase(this.lang);
    return (({ title }) => title.toLocaleLowerCase(this.lang) === search);
  }

  byDate(date?: Date, compare = DateCompare.AFTER): ForumFilter {
    if (!date) {
      return Boolean;
    }
    return ({ createdAt, comments }: Forum) => {
      const createdTime = (createdAt.getTime() - date.getTime()) * compare >= 0;
      const hasComment = comments.map(({ createdAt }) => createdAt.getTime()).some((commentTime) => {
        return (commentTime - date.getTime()) * compare >= 0;
      });
      return createdTime || hasComment;
    }
  }

  byUser(userId?: string): ForumFilter {
    if (!userId) {
      return Boolean;
    }
    return ({ createdBy, comments }: Forum) => (
      createdBy === userId || comments.some((comment) => comment.userId === userId)
    )
  }

  orderBy(orderBy: OrderBy = OrderBy.DATE_DESC, userFirst?: string): Comperator {
    return (forumA: StoredForum, forumB: StoredForum) => {
      const [field, direction] = orderBy.split('.', 2);
      if (userFirst) {
        const aIsRelated = forumA.isUserRelated(userFirst);
        const bIsRelated = forumB.isUserRelated(userFirst);
        if (aIsRelated !== bIsRelated) {
          return aIsRelated ? 1 : -1;
        }
      }
      let result = 0;
      if (field === 'name') {
        result = forumA.title.localeCompare(forumB.title, this.lang);
      } else if (field === 'date') {
        const aMaxDate = Math.max(...forumA.getDateInfo());
        const bMaxDate = Math.max(...forumB.getDateInfo());
        result = aMaxDate - bMaxDate;
      }
      return direction === 'ASC' ? result : -result;
    }
  }
}