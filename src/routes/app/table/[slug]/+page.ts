export const ssr =false;

export const load = (async({ params, url }) => {
  let tableName = params.slug
  let recordId = url.searchParams.get("r") ?? ""
  
  return {
      tableName: tableName, 
      page: url.searchParams.get("p") ?? 1,
      limit: url.searchParams.get("l") ?? 50, //default page limit 
      recordId: recordId,
  }
})