
// <--! package -->


import java.io.Serializable;

import io.swagger.annotations.ApiModelProperty;

public class BubbleEntry implements Serializable {

	/**
	 * Name
	 */
	@ApiModelProperty(value = "name")
	private String name;

	/**
	 * x
	 */
	@ApiModelProperty(value = "x")
	private String x;

	/**
	 * y
	 */
	@ApiModelProperty(value = "y")
	private double y;

	/**
	 * r
	 */
	@ApiModelProperty(value = "r")
	private double r;

	public BubbleEntry(String name, double x, double y){
	    this.name = name;
	    this.x = name;
	    this.y = x;
	    this.r = y;
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
	 * @return the x
	 */
	public String getX() {
		return x;
	}

	/**
	 * @param x the x to set
	 */
	public void setX(String x) {
		this.x = x;
	}

	/**
	 * @return the y
	 */
	public double getY() {
		return y;
	}

	/**
	 * @param y the y to set
	 */
	public void setY(double y) {
		this.y = y;
	}

	/**
	 * @return the r
	 */
	public double getR() {
		return r;
	}

	/**
	 * @param r the r to set
	 */
	public void setR(double r) {
		this.r = r;
	}

	@Override
	public String toString() {
		return "BubbleEntry [name=" + name + ", x=" + x + ", y=" + y + ", r=" + r + "]";
	}
}
