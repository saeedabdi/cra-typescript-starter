import { action, makeObservable, observable, runInAction } from 'mobx';

export class CategoriesStore {
    public categories: Array<any>;
    public loading: boolean;
    public selectedCategory?: any = undefined;

    constructor() {
        this.loading = true;
        this.categories = [];

        makeObservable(this, {
            loading: observable,
            categories: observable,
            selectedCategory: observable,
            initialize: action,

            getCategory: action,
        });
    }

    public async initialize() {
        runInAction(() => {
            this.categories = [];
            this.loading = false;
        });
    }

    public getCategory(id: string) {
        console.log(
            '🚀 ~ file: categories.store.ts ~ line 45 ~ CategoriesStore ~ getCategory ~ string',
            this,
        );

        return 's';
    }
}
