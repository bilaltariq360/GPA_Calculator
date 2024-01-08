$(".form-field").keyup(function (event) {
  var fieldValue = $(".form-field").val();

  if (fieldValue !== "" && isNaN(parseInt(fieldValue))) {
    $(".error-box p").text("Enter numbers only");
    $(".error-box").css("visibility", "visible");
    $(".course-details").empty();

    return;
  } else if (parseInt(fieldValue) > 9) {
    $(".error-box p").text("Range error 1 - 9");
    $(".error-box").css("visibility", "visible");
    $(".course-details").empty();

    return;
  } else {
    $(".error-box").css("visibility", "hidden");
  }

  if (event.key === "Backspace") {
    $(".course-details").empty();
  }
  for (let i = 0; i < Number(fieldValue); i++) {
    $(".course-details").append(
      '<div class="course"><input class="course-input" type="text" placeholder="Course" /><div class="spacer"></div><div class="dropdown"><div class="select"><span class = "c' +
        i +
        '">Credit Hour</span></div><input type="hidden" /><ul class="dropdown-menu"><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li></ul></div><div class="spacer"></div><div class="dropdown"><div class="select"><span class = "g' +
        i +
        '">Grade</span></div><input type="hidden" /><ul class="dropdown-menu"><li>A / A+</li><li>A-</li><li>B+</li><li>B</li><li>B-</li><li>C+</li><li>C</li><li>C-</li><li>D+</li><li>D</li><li>F</li></ul></div></div>'
    );
  }
  setDropdown();
});

function setDropdown() {
  $(".dropdown").click(function () {
    $(this).attr("tabindex", 1).focus();
    $(this).toggleClass("active");
    $(this).find(".dropdown-menu").slideToggle(300);
  });
  $(".dropdown").focusout(function () {
    $(this).removeClass("active");
    $(this).find(".dropdown-menu").slideUp(300);
  });
  $(".dropdown .dropdown-menu li").click(function () {
    $(this).parents(".dropdown").find("span").text($(this).text());
    $(this)
      .parents(".dropdown")
      .find("input")
      .attr("value", $(this).attr("id"));
  });
}

$(".calBtn").click(function () {
  let tCH = totalCreditHours();
  let tPS = totalPointsScored();
  if (!isNaN(tPS / tCH))
    $(".calgpa").text((totalPointsScored() / totalCreditHours()).toFixed(2));
});

function gradePoints(grade) {
  if (grade == "A / A+") return 4.0;
  else if (grade === "A-") return 3.67;
  else if (grade === "B+") return 3.33;
  else if (grade === "B") return 3.0;
  else if (grade === "B-") return 2.77;
  else if (grade === "C+") return 2.33;
  else if (grade === "C") return 2.0;
  else if (grade === "C-") return 1.67;
  else if (grade === "D+") return 1.33;
  else if (grade === "D") return 1.0;
  else if (grade === "F") return 0.0;
}

function totalCreditHours() {
  let totalCreditH = 0;
  for (let i = 0; i < Number($(".form-field").val()); i++) {
    if (!isNaN($(".c" + i).text()) && $(".g" + i).text() !== "Grade") {
      totalCreditH += Number($(".c" + i).text());
    }
  }

  return totalCreditH;
}

function totalPointsScored() {
  let totalpoints = 0.0;
  for (let i = 0; i < Number($(".form-field").val()); i++) {
    if (
      $(".g" + i).text() !== "Grade" &&
      $(".c" + i).text() !== "Credit Hour"
    ) {
      totalpoints +=
        Number($(".c" + i).text()) * gradePoints($(".g" + i).text());
    }
  }

  return totalpoints;
}
