
// <--! package -->

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import io.swagger.annotations.ApiModelProperty;

// <--! import -->

public class MultiSerieEntry implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * Name
	 */
	@ApiModelProperty(value = "name")
	private String name;

	@NotNull
	@Valid
	@ApiModelProperty(value = "series")
	private List<SerieEntry> series;

	public MultiSerieEntry(String name, List<SerieEntry> series) {
		this.name = name;
		this.series = series;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the series
	 */
	public List<SerieEntry> getSeries() {
		return series;
	}

	/**
	 * @param series the series to set
	 */
	public void setSeries(List<SerieEntry> series) {
		this.series = series;
	}

	public static List<MultiSerieEntry> convertFrom(List<MultiSerieEntryProjection> l) {
		if (l != null) {
			List<MultiSerieEntry> res = new ArrayList<MultiSerieEntry>();

			Map<String,List<SerieEntry>> m = new HashMap<String,List<SerieEntry>>();
			for (Iterator iterator = l.iterator(); iterator.hasNext();) {
				MultiSerieEntryProjection s = (MultiSerieEntryProjection) iterator.next();
				List<SerieEntry> lse = m.get(s.getSerieName());
				if(lse == null) {
					lse = new ArrayList<SerieEntry>();
					m.put(s.getSerieName(),lse);
				}
				lse.add(new SerieEntry(s.getName(), s.getValue()));
			}

			for (Iterator it = m.entrySet().iterator(); it.hasNext();) {
				Map.Entry<String, List<SerieEntry>> e = (Map.Entry<String, List<SerieEntry>>) it.next();
				res.add(new MultiSerieEntry(e.getKey(),e.getValue()));
			}
			return res;
		} else {
			return null;
		}
	}

	@Override
	public String toString() {
		return "MultiSerieEntry [name=" + name + ", series=" + series + "]";
	}
}
