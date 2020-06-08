
// <--! package -->

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// <--! import -->

/**
 * REST controller for chart.
 */
@RestController
@RequestMapping("/api")
public class ProductChartResource {

	private final Logger log = LoggerFactory.getLogger(ProductChartResource.class);

	@Value("${jhipster.clientApp.name}")
	private String applicationName;

	private ProductChartRepository productChartRepository;

	public ProductChartResource(ProductChartRepository productChartRepository) {
		this.productChartRepository = productChartRepository;
	}

	/**
	 * {@code GET  /chart/:id} : get the "id" chart.
	 *
	 * @return a chart
	 */
	@GetMapping("/chart/{id}")
	public ResponseEntity<ChartDTO> getChart(@PathVariable Long id) {
		log.debug("REST request to get Chart : {}", id);

		if (id == 1) {
			// MULTI
			ChartDTO chartDTO = new ChartDTO();
			List<MultiSerieEntryProjection> ml = productChartRepository.sumPricePerCountryAndYear();
			chartDTO.setMulti(MultiSerieEntry.convertFrom(ml));
			return ResponseEntity.ok().body(chartDTO);
		} else if (id == 2) {
			// SINGLE
			ChartDTO chartDTO = new ChartDTO();
			List<SerieEntryProjection> l = productChartRepository.sumPricePerCountry();
			chartDTO.setSingle(SerieEntry.convertFrom(l));
			return ResponseEntity.ok().body(chartDTO);
		} else {
			// TODO BUBBLE
            ChartDTO chartDTO = new ChartDTO();
            List<BubbleSerieEntryProjection> bl = productChartRepository.sumPriceAndQuantityPerCountryAndYear();
            chartDTO.setBubble(BubbleSerieEntry.convertFrom(bl));
            return  ResponseEntity.ok().body(chartDTO);


			//return null;
		}
	}
}
