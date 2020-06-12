
// <--! package -->

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.persistence.Id;

import io.swagger.annotations.ApiModelProperty;

// <--! import -->

public class SerieEntry implements Serializable, SerieEntryProjection {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * Name
	 */
	@ApiModelProperty(value = "name")
	@Id
	private String name;

	/**
	 * Value
	 */
	@ApiModelProperty(value = "value")
	private Double value;

	public SerieEntry(String name, Double value) {
		this.name = name;
		this.value = value;
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
	 * @return the value
	 */
	public Double getValue() {
		return value;
	}

	/**
	 * @param value the value to set
	 */
	public void setValue(Double value) {
		this.value = value;
	}

	public static List<SerieEntry> convertFrom(List<SerieEntryProjection> l) {
		if (l != null) {
			List<SerieEntry> res = new ArrayList<SerieEntry>(l.size());
			for (Iterator iterator = l.iterator(); iterator.hasNext();) {
				SerieEntryProjection s = (SerieEntryProjection) iterator.next();
				System.out.println("convertFrom = " + s.getName() + " " + s.getValue());

				res.add(new SerieEntry(s.getName(), s.getValue()));
			}
			return res;
		} else {
			return null;
		}
	}

	@Override
	public String toString() {
		return "SerieEntry [name=" + name + ", value=" + value + "]";
	}
}
