
// <--! package -->

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/**
 * A DTO for chart.
 */
@ApiModel(description = "Chart")
@JsonInclude(Include.NON_NULL)
public class ChartDTO implements Serializable {

	@ApiModelProperty(value = "single")
	private List<SerieEntry> single;

	@ApiModelProperty(value = "multi")
	private List<MultiSerieEntry> multi;

	@ApiModelProperty(value = "bubble")
	private List<BubbleSerieEntry> bubble;

	/**
	 * @return the single
	 */
	public List<SerieEntry> getSingle() {
		return single;
	}

	/**
	 * @param single the single to set
	 */
	public void setSingle(List<SerieEntry> single) {
		this.single = single;
	}

	/**
	 * @return the multi
	 */
	public List<MultiSerieEntry> getMulti() {
		return multi;
	}

	/**
	 * @param multi the multi to set
	 */
	public void setMulti(List<MultiSerieEntry> multi) {
		this.multi = multi;
	}


	/**
	 * @return the bubble
	 */
	public List<BubbleSerieEntry> getBubble() {
		return bubble;
	}

	/**
	 * @param bubble the bubble to set
	 */
	public void setBubble(List<BubbleSerieEntry> bubble) {
		this.bubble = bubble;
	}

	@Override
	public String toString() {
		return "ChartDTO [single=" + single + ", multi=" + multi + ", bubble=" + bubble + "]";
	}
}
