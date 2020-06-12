
// <--! package -->



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

// <--! import -->

/**
 * Spring Data repository for the Product entity.
 * https://www.baeldung.com/spring-data-jpa-projections
 */
@Repository
public interface ProductChartRepository extends JpaRepository<Product, Long> {

	/**
	 *  sum Price Per Country
	 * @return a list of SerieEntryProjection
	 */
	@Query(value = "SELECT country as name, SUM(price) as value "
			+ "FROM product "
			+ "GROUP BY country ", nativeQuery = true)
	List<SerieEntryProjection> sumPricePerCountry();

	/**
	 *  sum Price Per Country And Year
	 * @return a list of MultiSerieEntryProjection
	 */
	@Query(value = "SELECT p.country as serieName, YEAR(p.date) as name, SUM(p.price) as value "
			+ " FROM product p"
			+ " GROUP BY p.country, YEAR(p.date)", nativeQuery = true)
	List<MultiSerieEntryProjection> sumPricePerCountryAndYear();

	@Query(value ="SELECT p.country as serieName, YEAR(p.date) as name, SUM(p.price) as x, SUM(p.quantity) as y"
        + " FROM product p"
        + " GROUP BY p.country, YEAR(p.date)",nativeQuery = true)
    List<BubbleSerieEntryProjection> sumPriceAndQuantityPerCountryAndYear();

}
