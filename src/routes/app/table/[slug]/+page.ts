export const ssr =false;
 
export const load = (({ params, url }) => {
  return {
      tableName: params.slug, 
      page: url.searchParams.get("p") ?? 1,
      limit: url.searchParams.get("l") ?? 50 //default page limit 
  }
})