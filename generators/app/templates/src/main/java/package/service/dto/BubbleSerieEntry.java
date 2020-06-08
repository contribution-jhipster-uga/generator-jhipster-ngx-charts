
// <--! package -->

import java.io.Serializable;
import java.util.*;

import io.swagger.annotations.ApiModelProperty;

// <--! import -->

public class BubbleSerieEntry implements Serializable {

	/**
	 * Name
	 */
	@ApiModelProperty(value = "name")
	private String name;

	/**
	 * x
	 */
	@ApiModelProperty(value = "series")
	private List<BubbleEntry> series;

	public BubbleSerieEntry(String name, List<BubbleEntry> series){
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
	public List<BubbleEntry> getSeries() {
		return series;
	}

	/**
	 * @param series the series to set
	 */
	public void setSeries(List<BubbleEntry> series) {
		this.series = series;
	}

   public static List<BubbleSerieEntry> convertFrom(List<BubbleSerieEntryProjection> l) {
        if (l != null) {
            List<BubbleSerieEntry> res = new ArrayList<BubbleSerieEntry>();

            Map<String,List<BubbleEntry>> m = new HashMap<String,List<BubbleEntry>>();
            for (Iterator iterator = l.iterator(); iterator.hasNext();) {
                BubbleSerieEntryProjection s = (BubbleSerieEntryProjection) iterator.next();
                List<BubbleEntry> lse = m.get(s.getSerieName());
                if(lse == null) {
                    lse = new ArrayList<BubbleEntry>();
                    m.put(s.getSerieName(),lse);
                }
                lse.add(new BubbleEntry(s.getName(), s.getX(),s.getY()));
            }

            for (Iterator it = m.entrySet().iterator(); it.hasNext();) {
                Map.Entry<String, List<BubbleEntry>> e = (Map.Entry<String, List<BubbleEntry>>) it.next();
                res.add(new BubbleSerieEntry(e.getKey(),e.getValue()));
            }
            return res;
        } else {
            return null;
        }
    }

	@Override
	public String toString() {
		return "BubbleSerieEntry [name=" + name + ", series=" + series + "]";
	}

}
