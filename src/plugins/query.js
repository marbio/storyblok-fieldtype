export function getProductsBySearchTerm(searchTerm) {
    return {query:`{ 
        products(
          search: "${searchTerm}"
        ) {
          total_count
          items {
            id
            name
            sku
            image {
              url
              label
            }
            price_range {
              minimum_price {
                regular_price {
                  value
                  currency
                }
                final_price {
                  value
                  currency
                }
                discount {
                  amount_off
                  percent_off
                }
              }
              maximum_price {
                regular_price {
                  value
                  currency
                }
                final_price {
                  value
                  currency
                }
                discount {
                  amount_off
                  percent_off
                }
              }
            }
          }
          page_info {
            page_size
            current_page
          }
        }
        }`
    };
}