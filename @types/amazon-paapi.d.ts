declare module 'amazon-paapi' {
  type Common = {
    AccessKey: string;
    SecretKey: string;
  };

  type Request = {
    Keywords: string;
    SearchIndex: 'Books';
    ItemCount: number;
    Resources: string[];
  };

  const SearchItems = async (
    commonParameters: Common,
    requestParameters: Request,
  ) => {
    return null as any;
  };

  export { SearchItems };
}
